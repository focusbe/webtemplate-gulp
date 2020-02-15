const { src, dest } = require("gulp");
const through = require("through2");
const replace = require("gulp-replace");
var Test2 = function () {
    return src('src/*.html')
        .pipe(replace(/<html/, function (...matches) {
            console.log('start replace');
            new Promise((resolve, reject) => {
                setTimeout(function () {
                    console.log('replace promise');
                    resolve(true);
                }, 4000);
            }).then((res) => {
                console.log(res);
            })
            return matches[0];
        }))
        .pipe(through.obj((buff, env, cb) => {
            console.log('test2 through');
            cb(null, buff);
        }))
        .pipe(dest('dist/'))
}
module.exports = Test2;