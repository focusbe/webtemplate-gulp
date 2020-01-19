const fse = require("fs-extra");
const path = require("path");
var configfile = path.resolve(__dirname, "../config.json");
var isexit = fse.existsSync(configfile);
const inquirer = require("inquirer");
var defaultConfig = {
	src: "src/",
	dist: "dist/",
	proxy: [],
	game: "",
	actname: ""
};
if (!isexit) {
	fse.writeJsonSync(configfile, defaultConfig);
}
var Config = fse.readJsonSync(configfile);
if (!Config) {
	Config = defaultConfig;
}

module.exports = Config;
