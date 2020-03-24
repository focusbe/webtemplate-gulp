const Pkg = require("./pkg");
const Util = require("../../libs/util");
const config = require("../../config");
const through = require("through2");
const { src } = require("gulp");
const jsState = require("./state");
const Copy = require("./copy");
const watchjs = require("./watchjs");
async function Scripts(cb) {
	// console.log('start scripts');
	if (!global.ChangedJs) {
		watchjs();
		//第一次打包
		var list = jsState.list;
		var entries = [];
		for (var i in list) {
			entries.push(i);
		}
		await Pkg(entries);
		//先打包然后对其余的js进行复制
		src(`${config.src}**/*.js`)
			.pipe(
				through.obj(function (file, enc, cb) {
					let relpath = config.src + file.relative;
					if (!jsState.getJs(relpath)) {
						Copy(relpath);
					}
					cb(null, file);
				})
			)
	}
	else {
		//就是文件发生改变
		for (var i in global.ChangedJs) {
			console.log(global.ChangedJs[i] + "发生改变");
			var curfile = global.ChangedJs[i];
			var jsProp = jsState.getJs(curfile);
			//return;
			if (!jsProp || (!jsProp.inHtml && !jsProp.inJs)) {
				Copy(curfile);
			}
			else {
				if (jsProp.inHtml) {
					await Pkg([curfile]);
				}
				if (jsProp.inJs) {
					await Pkg([jsProp.inJs]);
				}
			}
		}
		global.ChangedJs = [];
	}
}
module.exports = Scripts;
