//打包 打包images
const Config = require("../config");
const fse = require("fs-extra");
const tinypng = require("tinypngjs");
const { src } = require("gulp");
const through = require("through2");
const path = require("path");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const cachePath = path.resolve(__dirname, "../cache");
if (!fse.existsSync(cachePath)) {
	fse.mkdirSync(cachePath);
}
const adapter = new FileSync(path.resolve(__dirname, "../cache/db.json"));
const db = low(adapter);
db.defaults({ images: [] }).write();
const reload = require("./server");
function Images() {
	return src(`${Config.src}**/*.{png,jpg,gif,ico,svg}`).pipe(
		through.obj(async function(file, enc, cb) {
			try {
				var stat = await fse.stat(file.path);
				var compressed = db
					.get("images")
					.find({ file: file.path })
					.value();
				if (!stat || !stat.mtime || !compressed || compressed.mtime.toString() != stat.mtime.toString()) {
					try {
						await tinypng.compressImg(file.path, file.path);
						stat = await fse.stat(file.path);
						if (!compressed) {
							db.get("images")
								.push({ file: file.path, mtime: stat.mtime || "" })
								.write();
						} else {
							db.get("images")
								.find({ file: file.path })
								.assign({ mtime: stat.mtime || "" })
								.write();
						}
						
						cb(null, file);
					} catch (error) {}
				} else {
					let outPath = path.resolve(file.base, "../", Config.dist, file.relative);
					await fse.copy(file.path, outPath);
					reload({ stream: true });
					cb(null, file);
				}
				//console.log(outPath);
			} catch (error) {
				
				cb(error, file);
			}
		})
	);
}
module.exports = Images;
