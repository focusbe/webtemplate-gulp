const gulpwatch = require("gulp").watch;
const config = require("../config");
const script = require("./script");
const css = require("./css");
const images = require("./images");
const html = require("./html");
const copy = require("./copy");
const { series, task } = require("gulp");
//改动的文件。
global.ChangedJs = null;
async function watch() {
	var scriptWatch = gulpwatch(config.src + "**/*.{js,ts}", script);
	scriptWatch.on("all", function(event, file) {
		if (!global.ChangedJs) {
			global.ChangedJs = [];
		}
		global.ChangedJs.push(file);
	});
	gulpwatch(config.src + "**/*.{shtml,html}", series(html, css, script));
	gulpwatch(config.src + "**/*.{less, styl, stylus}", css);
	gulpwatch(config.src + "**/*.{png,jpg,gif,ico,svg}", images);
	gulpwatch(copyglob, copy);
}
module.exports = watch;
