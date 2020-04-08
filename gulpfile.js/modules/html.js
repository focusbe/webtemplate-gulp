const config = require("../config");
const { src, dest } = require("gulp");
const htmlmin = require("gulp-htmlmin");
const path = require("path");
const replace = require("gulp-replace");
const reload = require("./server").reload;
const Util = require("../libs/util.js");
const jsState = require("./script/state");
const fileinclude = require("gulp-file-include");
function html() {
	global.entries = [];
	global.cssFiles = [];
	let htmltask = src(`${config.src}**/*.{html,shtml}`)
		.pipe(
			fileinclude()
		)
		.pipe(
			htmlmin({
				collapseWhitespace: true,
			})
		)
		.pipe(
			replace(/<([^\s'"<>\/a]+)[^<>]*?(src|href)=['|"]([^'"]+)['|"][^<>]*?>/gi, function (...param) {
				let sourceUrl = param[3];
				if (!Util.isRelativeUrl(sourceUrl)) {
					return param[0];
				}
				let curHtmlDir = path.dirname(this.file.relative);
				let filePath = config.src + path.join(curHtmlDir, sourceUrl);
				filePath = Util.formatPath(filePath);
				var isEntry = Util.isEntry(filePath);
				if (isEntry) {
					filePath = isEntry;
					jsState.setJs(filePath, "inHtml", true);
				}
				filePath = Util.getStyles(filePath);
				sourceUrl = Util.toVersionUrl(sourceUrl);
				sourceUrl = Util.addVersion(sourceUrl);
				return param[0].replace(param[3], sourceUrl);
			})
		)
		.pipe(dest(config.dist))
		.pipe(reload({ stream: true }));
	return htmltask;
}
module.exports = html;
