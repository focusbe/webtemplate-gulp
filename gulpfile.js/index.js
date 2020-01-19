const { series, watch, task } = require("gulp");
const script = require("./modules/script");
const css = require("./modules/css");
const images = require("./modules/images");
const html = require("./modules/html");
const clean = require("./modules/clean");
const publish = require("./modules/publish");
const Config = require("./config");
// console.log(Config.game);
function setWatch() {
	watch(Config.src + "**/*.{js,ts}", script);
	watch(Config.src + "**/*.{shtml,html}", html);
	watch(Config.src + "**/*.{css,scss,less}", css);
	watch(Config.src + "**/*.{png,jpg,gif,ico,svg}", images);
}
setWatch();
function setTasks() {
	task("publish", publish);
	task("dev", series(clean, script, css, html, images));
}
setTasks();

exports.default = function() {};
