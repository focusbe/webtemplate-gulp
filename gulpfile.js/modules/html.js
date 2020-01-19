const config = require("../config");
const { src, dest, watch } = require("gulp");
const htmlmin = require("gulp-htmlmin");
const version = require("./version");
const replace = require("gulp-replace");
const reload = require("./server").reload;
async function html() {
	return src(`${config.src}**/*.{html,shtml}`)
		.pipe(
			htmlmin({
				collapseWhitespace: true
			})
		)
		.pipe(
			replace(/(src|href)=('|")(\S+)('|")/gi, function(...param) {
				// param.splice(param.length - 2, 2);
				// param.splice(0, 1);
				if(param[2]=="./js/main.js"||param[2]=="./js/main.ts"){
					param[2]=="./js/bundle.js";
				}
				if (param[1] == "href" && param[2].indexOf(".css") == -1) {
					return param[0];
				}
				let imgurl = param[0];
				if (param[2].indexOf("?") == -1) {
					imgurl = imgurl.replace(param[3], param[3] + "?v=" + version);
				}

				return imgurl;
			})
		)
		.pipe(dest(config.dist))
		.pipe(reload({ stream: true }));
}
module.exports = html;
