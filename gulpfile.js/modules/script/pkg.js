const { dest } = require("gulp");
const Utli = require("../../libs/util");
const config = require("../../config");
const browserify = require("browserify");
const argv = require("yargs").argv;
const babelify = require("babelify");
const source = require("vinyl-source-stream");
const uglify = require("gulp-uglify");
const buffer = require("vinyl-buffer");
const gulpif = require("gulp-if");
const path = require("path");
const DEBUG = argv._ == "dev";
const through = require("through2");
const jsState = require("./state");
const reload = require("../server").reload;
const Copy = require("./copy");
function pkgEntries(entries) {
	var promiseArr = [];
	if (typeof entries == "string") {
		entries = [entries];
	}
	entries.map(entry => {
		entry = Utli.formatPath(entry);
		let filename = entry.split("/");
		filename = filename[filename.length - 1];
		filename = filename.split(".")[0] + ".js";
		promiseArr.push(
			new Promise(async (resolve, reject) => {
				//这里先记录一下上次和打包文件相关的，用于比较打包完成后新的与文件相关 做比较
				let outDir = config.dist + Utli.toVersionUrl(path.dirname(entry.replace(config.src, "")));
				var shouldPkg = await Utli.hasEs6(entry);
				let jsFiles = [];
				if (shouldPkg) {
					browserify({
						entries: entry,
						debug: DEBUG
					})
						.transform(babelify, {
							//此处babel的各配置项格式与.babelrc文件相同
							presets: [["@babel/preset-env"]],
							plugins: [
								[
									"@babel/plugin-transform-runtime",
									{
										corejs: 3,
										helpers: true,
										regenerator: true,
										useESModules: false
									}
								]
							]
						})
						.on("bundle", function(bundle) {
							console.log("打包" + filename);
						})
						.on("file", function(filename) {
							let relativePath = path.relative(path.resolve(__dirname, "../../../"), filename);
							relativePath = Utli.formatPath(relativePath);
							if (relativePath.indexOf("node_modules/") == -1) {
								if (relativePath != entry) {
									jsFiles.push(relativePath);
								}
							}
						})
						.bundle() //合并打包
						.on("error", function(error) {
							console.error(error.toString());
							resolve(false);
						})
						.pipe(source(filename))
						.pipe(buffer())
						.pipe(gulpif(!DEBUG, uglify()))
						.pipe(dest(outDir))
						.pipe(reload({ stream: true }))
						.pipe(
							through.obj(function(file, enc, cb) {
								console.log("打包成功" + outDir + "/", filename);
								jsState.setInjs(entry, jsFiles);
								resolve(true);
								cb();
							})
						);
				} else {
					//复制就可以了呀
					try {
						jsState.setInjs(entry, jsFiles);
						Copy(entry);
						resolve(true);
					} catch (error) {
						console.log(error);
						resolve(false);
					}
				}
			})
		);
	});
	return Promise.all(promiseArr);
}
module.exports = pkgEntries;
