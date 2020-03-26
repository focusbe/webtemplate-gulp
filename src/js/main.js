import 'es5-shim';
import 'object-create-ie8';
var grJs = require("grequirejs");
async function main() {
	var gplayer = await grJs("gplayer/main");
	console.log(gplayer);
	var res = await grJs(["gplayer/main", "fastreg/main"]);
	console.log(res);
	alert(2);
}

main();