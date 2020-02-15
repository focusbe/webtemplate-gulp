//不在目录 css js 下面的文件全部复制
const config = require("../config");
const { src, dest } = require("gulp");
copyglob = [].concat(global.copyglob);
for (var i in global.entries) {
	copyglob.push(`!${config.src}${global.entries[i]}`);
}
function copy() {
    return src(copyglob)
        .pipe(dest(config.dist));
}
module.exports = copy;