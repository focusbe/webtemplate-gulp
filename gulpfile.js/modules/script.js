//打包 main.js /main.ts文件
const Config = require("../config");
const { dest } = require("gulp");
const browserify = require("browserify");
const fse = require("fs-extra");
const argv = require("yargs").argv;
const babelify = require("babelify");
const tsify = require("tsify");
const source = require("vinyl-source-stream");
const reload = require("./server");
//console.log(browserSync);
// browserSync.reload();
async function Script() {
    //以 js/main.js 或 js/main.ts为入口打包 js文件
    let entry = Config.src + "/js/main.ts";
    let stat = await fse.exists(entry);
    if (!stat) {
        entry = Config.src + "/js/main.js";
    }
    return browserify({
        entries: [entry],
        debug: !argv.p
    })
        .plugin(tsify) //添加对typescript的支持
        .transform(babelify, {
            //此处babel的各配置项格式与.babelrc文件相同
            presets: [
                "es2015", //转换es6代码
                "stage-0" //指定转换es7代码的语法提案阶段
            ],
            plugins: [
                "transform-runtime" //添加es5不支持的模块比如Object.assing()
            ]
        })
        .bundle() //合并打包
        .pipe(source("bundle.js"))
        .pipe(dest(Config.dist + "js/"))
        .pipe(reload({ stream: true }))

}

module.exports = Script;
