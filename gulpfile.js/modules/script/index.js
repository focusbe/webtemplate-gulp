const Pkg = require("./pkg");
const config = require("../../config");
const jsState = require("./state");
const Copy = require("./copy");
const watchjs = require("./watchjs");
const glob = require("glob");
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
		var promiseArr = [];
		glob(`${config.src}**/*.js`, (error, files) =>{
			for (var i in files) {
				let relpath = files[i];
				if (!jsState.getJs(relpath)) {
					promiseArr.push(Copy(relpath));
				}
			}
		});
		await Promise.all(promiseArr);
	} else {
		//就是文件发生改变
		for (var i in global.ChangedJs) {
			console.log(global.ChangedJs[i] + "发生改变");
			var curfile = global.ChangedJs[i];
			var jsProp = jsState.getJs(curfile);
			//return;
			if (!jsProp || (!jsProp.inHtml && !jsProp.inJs)) {
				await Copy(curfile);
			} else {
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
