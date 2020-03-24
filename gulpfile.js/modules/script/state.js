const Utli = require("../../libs/util");
const State = {
    list: {},
    cbPool: [],
    init() {
        var self = this;
    },
    setJs(path, type, value) {
        if (Array.isArray(path)) {
            for (var i in path) {
                this.setJs(path[i], type, value);
            }
        }
        else {
			if(!path){
				return;
			}
			path = Utli.formatPath(path);
            if (!this.list[path]) {
                this.list[path] = {
                    inHtml: false,
                    inJs: ''
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
		if(!path){
			return;
		}
		path = Utli.formatPath(path);
        return this.list[path];
    },
    getInJs(jsFile){
		if(!jsFile){
			return;
		}
		jsFile = Utli.formatPath(jsFile);
		var res = [];
        for(var i in this.list){
            if(this.list[i].inJs==jsFile){
				res.push(i);
            }
		}
		return res;
	},
	setInjs(jsFile,newArr){
		var old = this.getInJs(jsFile);
		let oldIndex;
        jsFile = Utli.formatPath(jsFile);
		for(var i in newArr){
			let curjs = Utli.formatPath(newArr[i]);
			this.setJs(curjs,'inJs',jsFile);
            oldIndex = old.indexOf(newArr[i]);
			if(oldIndex>-1){
				old.splice(oldIndex,1);
			}
        }
        
		for(var i in old){
			this.setJs(old[i],'inJs','');
		}
	},
    removeEntry(js) {
		js = Utli.formatPath(jsFile);
        for (var i in this.list) {
            if (js == this.list[i].state) {
                this.list[i].inJs = '';
            }
        }
    },
    removeJs(path) {
		path = Utli.formatPath(path);
        if (this.list[path]) {
            try {
                delete this.list[path]
            } catch (error) {

            }
        }
    }
}
State.init();

module.exports = State;