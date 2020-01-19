const Config = require("../config");
const { src, dest } = require("gulp");
const fse = require('fs-extra');
async function Clean() {
    await fse.emptyDir(Config.dist);
}
module.exports = Clean;