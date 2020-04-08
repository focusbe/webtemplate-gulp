const config = require("./config");
global.pkgFiles = {
	'js': [".js"],
	'css': ['.less', '.styl', '.stylus'],
	'img': ['.png', '.jpg', '.gif', '.ico', '.svg'],
	'html': ['.html', '.shtml','.tpl']
}

var copyglob = [`${config.src}**/*.*`];
var pkgglob = `!${config.src}**/*.{`;
for (var i in global.pkgFiles) {
	for (var j in global.pkgFiles[i]) {
		pkgglob += global.pkgFiles[i][j].replace('.', '') + ',';
	}
}
pkgglob += '}';
copyglob.push(pkgglob);

global.copyglob = copyglob;
const { series, task } = require("gulp");
const script = require("./modules/script");
const css = require("./modules/css");
const images = require("./modules/images");
const html = require("./modules/html");
const publish = require("./modules/publish");
const Watch = require("./modules/watch");
const server = require("./modules/server").start;
const copy = require("./modules/copy");
const {cleanDist,cleanCache,clearCdn} = require("./modules/clean");
function setTasks() {
	task("clean", cleanCache);
	task("pubdev", publish);
	task("cdn", clearCdn)
	task("script", script);
	task("build", series(cleanDist, html, css, script, images('pro'), copy));
	task("dev", series(cleanDist, html, css, script, images('dev'), copy, Watch, server));
}
setTasks();
exports.default = function () { };
