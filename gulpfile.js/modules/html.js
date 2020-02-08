const config = require("../config");
const { src, dest, watch } = require("gulp");
const htmlmin = require("gulp-htmlmin");

const replace = require("gulp-replace");
const reload = require("./server").reload;
global.entries = [];
async function html() {
	return src(`${config.src}**/*.{html,shtml}`)
		.pipe(
			htmlmin({
				collapseWhitespace: true
			})
		)
		.pipe(
			replace(/(src|href)=('|")([^('|")]+)('|")/gi, function (...param) {


				if (param[1] == "href" && param[3].indexOf(".") == -1) {

					return param[0];
				}
				let realurl = param[3];
				if (param[1] == 'src' && (realurl.indexOf('./js/') == 0 || realurl.indexOf('js/') == 0)) {
					global.entries.push(realurl.replace('./', ""));
				}
				let version = new Date().getTime();
				if (realurl.indexOf(".ts") > -1) {
					realurl = realurl.replace(".ts", ".js");
				}
				else {
					let cssfiles = ['.sass', '.scss', '.less', '.styl', '.stylus', '.sass']
					console.log(realurl);
					for (var i in cssfiles) {
						
						if (realurl.indexOf(cssfiles[i]) > -1) {
							realurl = realurl.replace(cssfiles[i], '.css');
							break;
						}
						
					}
					console.log(realurl);
				}

				let imgurl = param[0];

				if (param[3].indexOf("?") == -1) {
					console.log(param[3]);
					imgurl = imgurl.replace(param[3], realurl + "?v=" + version);
					console.log(imgurl);
				}

				return imgurl;
			})
		)
		.pipe(dest(config.dist))
		.pipe(reload({ stream: true }));
}
module.exports = html;
