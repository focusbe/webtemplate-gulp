const path = require("path");
const fs = require("fs-extra");
const config = require("../config");
var Util = {
    isRelativeUrl: function (url) {
        if (url.indexOf('//') > -1) {
            return false;
        }
        return true;
    },
    isEntrySync: function (file) {
        try {
            let content = fs.readFileSync(file, 'utf8');
            if (!!content) {
                let requireReg = new RegExp(/(=\s?require\()|(import\s+(.+?)\s+from\s+(.+))/igs);
                var res = content.search(requireReg);
                return res > -1;
            }
            return false;
        } catch (error) {
            // console.log(error);
            return false;
        }
    },
    getEntry: function (filePath) {
        var jsExts = global.pkgFiles['js'];
        let extname = path.extname(filePath);
        if (jsExts.indexOf(extname) == -1) {
            return filePath;
        }
        var allPath = config.src + filePath;
        if (extname == '.js') {
            var isentry = Util.isEntrySync(allPath);
            if (isentry) {
                global.entries.push(filePath);
            }
        }
        else {
            global.entries.push(filePath);
            filePath = filePath.replace(extname, '.js');
        }
        return filePath;
    },
    getStyles: function (filePath) {
        console.log(filePath);
        var cssExts = global.pkgFiles['css'];
        let extname = path.extname(filePath);
        if (cssExts.indexOf(extname) == -1) {
            return filePath;
        }
        //var allPath = config.src + filePath;
        global.cssFiles.push(filePath);
        filePath = filePath.replace(extname, ".css");
        return filePath;
    },
    addVersion(sourceUrl) {
        var extname = path.extname(sourceUrl);
        if (global.pkgFiles['js'].indexOf(extname) > -1) {
            sourceUrl = sourceUrl.replace(extname, '.js');
        }
        else if (global.pkgFiles['css'].indexOf(extname) > -1) {
            sourceUrl = sourceUrl.replace(extname, '.css');
        }
        let version = new Date().getTime();
        if (sourceUrl.indexOf("?") == -1) {
            sourceUrl = sourceUrl + "?v=" + version;
        }
        return sourceUrl;
    }
}
module.exports = Util;
