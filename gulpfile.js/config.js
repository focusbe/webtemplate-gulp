const fse = require("fs-extra");
const path = require("path");
const readlineSync = require('readline-sync');
var configfile = path.resolve(__dirname, '../config.json');
var isexit = fse.existsSync(configfile);
var defaultConfig = {
    "src": "src/",
    "dist": "dist/",
    "proxy": []
}
var configArr = [
    {
        index: 'isact',
        name: "是否活动",
        type: "bool"
    },
    {
        index: 'version',
        name: "版本号",
        type: 'number'
    },
    {
        index: 'game',
        name: "游戏代号",
        type: 'string'
    },
    {
        index: 'actname',
        name: "活动名称",
        type: 'string'
    }
];
var result;
if (!isexit) {
    //console.warn("配置文件不存在");
    fse.writeJsonSync(configfile, defaultConfig);
}

var Config = fse.readJsonSync(configfile);
if (!Config) {
    Config = {}
}
// console.log(Config);
Config.generator = function () {
    for (var i in configArr) {
        let { index, name, type } = configArr[i];
        let answer = "";
        //if (typeof (this[index]) == 'undefined') {
        switch (type) {
            case 'bool':
                answer = readlineSync.keyInYN(name + ":");
                break;
            case 'string':
                answer = readlineSync.question("请输入" + name + ":");
                break;
            case 'number':
                answer = readlineSync.question("请输入" + name + ":");
                break;
        }
        this[index] = answer;
        //}
    }
    var configJson = Object.assign({}, this);
    delete configJson.generator;
    fse.writeJsonSync(configfile, configJson);
};
if (typeof (Config.game) == 'undefined') {
    Config.generator();
}
module.exports = Config;
