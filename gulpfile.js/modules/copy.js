//不在目录 css js 下面的文件全部复制
const config = require("../config");
const { src, dest } = require("gulp");
function copy() {
    let copyglob = [].concat(global.copyglob);
    for (var i in global.entries) {
        copyglob.push(`!${config.src}${global.entries[i]}`);
    }
    return src(copyglob)
        .pipe(dest(config.dist));
}
module.exports = copy;