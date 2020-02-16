const fse = require("fs-extra");
const path = require("path");
var configfile = path.resolve(__dirname, "../config.json");
var isexit = fse.existsSync(configfile);
var defaultConfig = {
	src: "src/",
	dist: "dist/",
	proxy: [
        {
            "path": "",
            "target": ""
        }
    ],
	game: "",
	actname: "",
	version: "",
	mobileDir: ["m", "mobile", "pc"]
};
if (!isexit) {
	fse.writeJsonSync(configfile, defaultConfig,{spaces:4});
}
var Config = fse.readJsonSync(configfile);
if (!Config) {
	Config = defaultConfig;
}

module.exports = Config;
