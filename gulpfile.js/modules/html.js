const Config = require("../config");
const { src, dest, watch } = require("gulp");
const htmlmin = require("gulp-htmlmin");
const version = require("./version");
const replace = require("gulp-replace");
const reload = require("./server");
function Html() {
	return src(`${Config.src}**/*.{html,shtml}`)
		.pipe(
			htmlmin({
				collapseWhitespace: true
			})
		)
		.pipe(
			replace(/(src|href)=('|")(\S+)('|")/gi, function(...param) {
				param.splice(param.length - 2, 2);
				param.splice(0, 1);
				if (param[2].indexOf("?") == -1) {
					param[2] = param[2] + "?v=" + version;
				}
				return param.join("");
			})
		)
		.pipe(dest(Config.dist))
		.pipe(reload({ stream: true }));
}
module.exports = Html;
