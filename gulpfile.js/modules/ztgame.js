var host = "C:/Windows/System32/drivers/etc/hosts";
const fse = require("fs-extra");
function ztgame(cb) {
	console.log("为了方便测试");
	fse.readFile(host, "utf8", (err, res) => {
		if (!err) {
			if (res.indexOf("local.ztgame.com") == -1) {
				res = res + "\n" + "127.0.0.1 local.ztgame.com ";
				fse.writeFile(host, res, "utf8", (err, res) => {
					if (!err) {
                        console.log("写成功");
                        cb();
					}
				});
			} else {
                console.log("已设置本地host");
                cb();
			}
		}
	});
}

module.exports = ztgame;
