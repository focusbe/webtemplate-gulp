const Config = require("../config");
const { dest } = require("gulp");
const browserSync = require("browser-sync");
const proxy = require('http-proxy-middleware');
var bs;
try {
    bs = browserSync.get("main");
} catch (error) {

}
if (!bs) {
    bs = browserSync.create('main');
    var proxyArr = [];
    if (!!Config.isact) {
        var devLink = 'http://' + Config.game + '.web.ztgame.com/act/' + Config.actname;
    }
    var proxyOptions = {
        target: devLink,
        changeOrigin: true,
    }
    proxyArr.push(
        proxy(['*.php', 'api/**'], proxyOptions)
    );
    bs.init({
        server: "./dist",
        middleware: proxyArr
    });
}
module.exports = bs.reload;