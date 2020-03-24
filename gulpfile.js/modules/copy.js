//不在目录 css js 下面的文件全部复制
const config = require("../config");
const { src, dest } = require("gulp");
const reload = require("./server").reload;
function copy() {
	return src(copyglob)
		.pipe(dest(config.dist))
		.pipe(reload({ stream: true }));
}
module.exports = copy;
