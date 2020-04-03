//打包 打包images
const config = require("../config");
const fse = require("fs-extra");
const tinypng = require("tinypngjs");
const { src } = require("gulp");
const glob = require("glob");
const through = require("through2");
const path = require("path");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const cachePath = path.resolve(__dirname, "../cache");
const Utli = require("../libs/util");
if (!fse.existsSync(cachePath)) {
	fse.mkdirSync(cachePath);
}
const adapter = new FileSync(path.resolve(__dirname, "../cache/db.json"));
const db = low(adapter);
db.defaults({ images: [] }).write();
const reload = require("./server").reload;
const ProgressBar = require("../libs/progress");

var progressBar = new ProgressBar();
function images(cb2) {
	let total = 0;
	let loaded = 0;
	function isEnd() {
		loaded++;
		progressBar.render({
			description: "图片压缩",
			completed: loaded,
			total: total
		});

		if (loaded >= total) {
			reload();
			cb2();
		}
	}
	function checkLoaded(input, output) {
		fse.copy(input, output)
			.then(res => {
				isEnd();
			})
			.catch(() => {
				isEnd();
			});
	}
	glob(`${config.src}**/*.{png,jpg,gif,ico,svg}`, (error, files) => {
		total = files.length;
		console.log(total);
		files.map((file, key) => {
			let relativePath = file.replace(config.src, "");
			let outPath = path.resolve(config.dist, path.dirname(Utli.toVersionUrl(relativePath)), path.basename(relativePath));
			// console.log(outPath);
			// console.log(relativePath);
			var stat = fse.statSync(file);
			var compressed = db
				.get("images")
				.find({ file: relativePath })
				.value();

			if (!stat || !stat.mtimeMs || !compressed || compressed.mtimeMs != stat.mtimeMs) {
				console.log('压缩'+file);
				tinypng
					.compressImg(file, file)
					.then(res => {
						console.log(res);
						if (!!res) {
							stat = fse.statSync(file);
							if (!compressed) {
								db.get("images")
									.push({ file: relativePath, mtimeMs: stat.mtimeMs || "" })
									.write();
							} else {
								db.get("images")
									.find({ file: relativePath })
									.assign({ mtimeMs: stat.mtimeMs || "" })
									.write();
							}
						}
						checkLoaded(file, outPath);
					})
					.catch(err => {
						console.log(err);
						checkLoaded(file, outPath);
					});
			} else {
				checkLoaded(file, outPath);
			}
		});
		if (files.length == 0) {
			cb2();
		}
	});
}
module.exports = images;
