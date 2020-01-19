//打包 打包scss,less
const Config = require("../config");
const { src, dest } = require("gulp");
const less = require("gulp-less");
const sass = require("gulp-sass");
const gulpif = require("gulp-if");
const stylus = require("gulp-stylus");
const version = require("./version");
const merge = require("merge-stream");
const reload = require("./server");
const replace = require("gulp-replace");
function Css() {
	let imgreplace = function() {
		return replace(/url\((\S+)\)/gi, function(...param) {
			// param.splice(param.length - 2, 2);
			// param.splice(0, 1);
			if (!!param[1] && param[1].indexOf("?") == -1) {
				param[0] = param[0].replace(param[1], param[1] + "?v=" + version);
			}
			return param[0];
		});
	};
	var scssTask = src([`${Config.src}**/*.{scss,sass,less}`, `!${Config.src}lib/**/*.{scss,sass,less}`])
		.pipe(
			gulpif(
				function(file) {
					return file.extname == ".less";
				},
				less(),
				sass()
			)
		)
		.pipe(imgreplace())
		.pipe(dest(Config.dist))
		.pipe(reload({ stream: true }));
	var stylusTask = src([`${Config.src}**/*.{styl,stylus}`, `!${Config.src}lib/**/*.{styl,stylus}`])
		.pipe(stylus())
		.pipe(imgreplace())
		.pipe(dest(Config.dist))
		.pipe(reload({ stream: true }));
	return merge(scssTask, stylusTask);
}

module.exports = Css;
