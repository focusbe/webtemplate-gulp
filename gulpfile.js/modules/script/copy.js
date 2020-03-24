const through = require("through2");
const jsState = require("./state");
const { src, dest } = require("gulp");
const config = require("../../config");
const path = require("path");
const Utli = require("../../libs/util");
const fs = require("fs-extra");
const reload = require("../server").reload;
async function Copy(file, isDelete) {
	if (typeof isDelete == "undefined") {
		isDelete = false;
	}
	file = Utli.formatPath(file);
	var exits = await fs.exists(file);
	if(!exits){
		isDelete = true;
	}
	var distFile = file.replace(config.src, config.dist);
	var dist = path.dirname(distFile);
	// 
	if (!isDelete) {
        console.log('复制：', file,'->',dist);
		src(file)
			.pipe(dest(dist))
			.pipe(reload({ stream: true }));
	} else {
		if (!!config.dist && distFile.indexOf(config.dist) == 0) {
			fs.unlink(distFile)
				.then(()=>{
					console.log("删除", distFile);
				})
				.catch(err => {
					// console.log(err);
				});
		}
	}
	return true;
}
module.exports = Copy;
