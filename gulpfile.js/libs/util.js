const path = require("path");
const fs = require("fs-extra");
const config = require("../config");
const fileMstats = {};
var Util = {
	isRelativeUrl: function (url) {
		if (url.indexOf("//") > -1) {
			return false;
		}
		return true;
	},
	isChanged(file) {

		try {
			let stat = fs.statSync(file);
			if (!!fileMstats[file] && fileMstats[file] == stat.mtimeMs) {
				return false;
			}
			fileMstats[file] = stat.mtimeMs;
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	},
	formatPath(url) {
		if (!url) {
			return "";
		}
		return url.replace(/\\/gis, "/");
	},
	async hasEs6(file) {
		try {
			let content = await fs.readFile(file, "utf8");
			if (!!content) {
				let es6Reg = new RegExp(/(\/\/\s*es6)|((let|const|async|await|Promise)\s+)|(=(\s*)>)|(\$\{)/gis);
				if (content.search(es6Reg) > -1) {
					return true;
				}
				let requireReg = new RegExp(/([^a-z0-9-_]?require\()|(import\s+(.+?)\s+from\s+(.+))/gis);
				let definReg = new RegExp(/[^a-z0-9-_]?define\(/);
				var hasDefine = content.search(definReg) > -1;
				var hasRequire = content.search(requireReg) > -1;
			
				return !hasDefine && hasRequire;
			}
			return false;
		} catch (error) {
			console.log(error);
			return false;
		}
	},
	isEntrySync: function (file) {
		try {
			let content = fs.readFileSync(file, "utf8");
			if (!!content) {
				let es6Reg = new RegExp(/\/\/\s*es6/gis);
				if (content.search(es6Reg) > -1) {
					return true;
				}
				let requireReg = new RegExp(/([^a-z0-9-_]?require\()|(import\s+(.+?)\s+from\s+(.+))/gis);
				let definReg = new RegExp(/[^a-z0-9-_]?define\(/);
				var hasDefine = content.search(definReg) > -1;
				var hasRequire = content.search(requireReg) > -1;
		
				return !hasDefine && hasRequire;
			}
			return false;
		} catch (error) {
			console.log(error);
			return false;
		}
	},
	getEntry: function (filePath) {
		var jsExts = global.pkgFiles["js"];
		let extname = path.extname(filePath);
		if (jsExts.indexOf(extname) == -1) {
			return filePath;
		}
		if (global.entries.indexOf(filePath) == -1) {
			global.entries.push(filePath);
		}
		filePath = filePath.replace(extname, ".js");
		return filePath;
	},
	isEntry(filePath) {
		var jsExts = global.pkgFiles["js"];
		let extname = path.extname(filePath);
		if (jsExts.indexOf(extname) == -1) {
			return false;
		}
		filePath = filePath.replace(extname, ".js");
		return filePath;
	},
	getStyles: function (filePath) {
		var cssExts = global.pkgFiles["css"];
		let extname = path.extname(filePath);
		if (cssExts.indexOf(extname) == -1) {
			return filePath;
		}
		//var allPath = config.src + filePath;
		if (global.cssFiles.indexOf(filePath) == -1) {
			global.cssFiles.push(filePath);
		}

		filePath = filePath.replace(extname, ".css");
		return filePath;
	},
	addVersion(sourceUrl) {
		var extname = path.extname(sourceUrl);
		if (global.pkgFiles["js"].indexOf(extname) > -1) {
			sourceUrl = sourceUrl.replace(extname, ".js");
		} else if (global.pkgFiles["css"].indexOf(extname) > -1) {
			sourceUrl = sourceUrl.replace(extname, ".css");
		}
		let version = new Date().getTime();
		if (sourceUrl.indexOf("?") == -1) {
			sourceUrl = sourceUrl + "?v=" + version;
		}
		return sourceUrl;
	},
	toVersionUrl: function (url) {
		if (!config.version) {
			return url;
		}
		var urlArr = url.split("/");
		var dirname = "";
		if (urlArr[0].indexOf(".") > -1) {
			dirname = urlArr.splice(0, 1) + "/";

			url = urlArr.join("/");
		}
		var mobileDir;
		if (!!config.mobileDir) {
			mobileDir = config.mobileDir;
		} else {
			mobileDir = ["m", "mobile"];
		}
		var mobileStr = mobileDir.join("|");
		var regStr = "^(?:(?:(?:" + mobileStr + ")/)?(images|css|js))(/\\S*)?$";
		var urlReg = new RegExp(regStr);
		var matchs = url.match(urlReg);
		if (!!matchs && !!matchs[1]) {
			url = url.replace(matchs[1], matchs[1] + "/" + config.version);
		}
		return dirname + url;
	},
	mkdirs: function (dirname, callback) {
		var self = this;
		fs.exists(dirname, function (exists) {
			if (exists) {
				callback();
			} else {
				self.mkdirs(path.dirname(dirname), function () {
					fs.mkdir(dirname, callback);
				});
			}
		});
	},
	copyFile: async function (srcPath, tarPath) {
		await new Promise((resolve) => {
			this.mkdirs(path.dirname(tarPath), function () {
				resolve(true);
			});
		})
		var res = await fs.copyFile(srcPath, tarPath);
		return res;
	}
};
module.exports = Util;
