const jsState = require("./state");
const Copy = require("./copy");
const Pkg = require("./pkg");
const fs = require("fs-extra");
function watchState() {
	jsState.onChange(async function(jsFile, type, oldVal, newVal) {
		var curState = jsState.list[jsFile];
		if (!curState["inJs"] && !curState["inHtml"]) {
			Copy(jsFile);
		} else {
			// console.log(jsFile, type, newVal);
			if (type == "inHtml") {
				if (newVal) {
					Pkg(jsFile);
				} else if (curState["inJs"]) {
					//删除多余的就是文件
					Copy(jsFile, true);
				}
			} else {
				if (newVal) {
					// console.log(newVal);
					Copy(jsFile, true);
				}
			}
		}
	});
}
module.exports = watchState;
