const Utli = require("../../libs/util");
const State = {
	list: {},
	cbPool: [],
	setJs(path, type, value) {
		//设置js的属性
		if (!path) {
			return;
		}
		if (Array.isArray(path)) {
			//同时设置多个
			for (var i in path) {
				this.setJs(path[i], type, value);
			}
		} else {
			path = Utli.formatPath(path);
			if (!this.list[path]) {
				this.list[path] = {
					inHtml: false,
					inJs: [], //在哪个js
				};
			}
			var curJs = this.list[path];
			var oldVal = curJs[type];
			if (oldVal != value) {
				curJs[type] = value;
				this.callCb(path, type, oldVal, value);
			}
		}
	},
	callCb(path, type, oldVal, newVal) {
		for (var i in this.cbPool) {
			this.cbPool[i](path, type, oldVal, newVal);
		}
	},
	onChange(cb) {
		this.cbPool.push(cb);
	},
	getJs(path) {
		if (!path) {
			return;
		}
		path = Utli.formatPath(path);
		return this.list[path];
	},
	getInJs(jsFile) {
		//获取某个文件引入了哪些js文件
		if (!jsFile) {
			return;
		}
		jsFile = Utli.formatPath(jsFile);
		var res = [];
		for (var i in this.list) {
			if (!!this.list[i].inJs && this.list[i].inJs.indexOf(jsFile) > -1) {
				res.push(i);
			}
		}
		return res;
	},
	setInjs(jsFile, newArr) {
		//重新设置入口文件包含哪些js文件
		jsFile = Utli.formatPath(jsFile);
		this.removeInjs(jsFile);
		for (var i in newArr) {
			let curjs = Utli.formatPath(newArr[i]);
			this.addInJs(curjs, jsFile);
		}
	},
	removeInjs(entryJs) {
		//移除所有入口文件相关的js
		for (var i in this.list) {
			if (!!this.list[i] && this.list[i].inJs) {
				var curIndex = this.list[i].inJs.indexOf(entryJs);
				if (curIndex >= 0) {
					this.list[i].inJs.splice(curIndex, 1);
				}
			}
		}
	},
	addInJs(path, inWhitch) {
		if (!this.list[path]) {
			this.list[path] = {
				inHtml: false,
				inJs: [inWhitch],
			};
		} else {
			if (!this.list[path]["inJs"]) {
				this.list[path]["inJs"] = [];
			}
			if (this.list[path]["inJs"].indexOf(inWhitch) < 0) {
				this.list[path]["inJs"].push(inWhitch);
			}
		}
	},
};

module.exports = State;
