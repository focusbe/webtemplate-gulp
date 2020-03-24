var grJs = require("grequirejs");
async function main() {
	var gplayer = await grJs("gplayer/main");
	console.log(gplayer);
	var res = await grJs(["gplayer/main", "fastreg/main"]);
    console.log(res);
}

main();


