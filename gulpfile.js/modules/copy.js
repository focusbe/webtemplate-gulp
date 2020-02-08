//不在目录 css js 下面的文件全部复制
const config = require("../config");
const { src, dest } = require("gulp");
async function copy() {
    return src([`${config.src}**/*.*`, `!${config.src}{css,js,images}/**/*.*`, `!${config.src}**/*.{png,jpg,gif,ico,svg,html}`])
        .pipe(dest(config.dist));
}
module.exports = copy;