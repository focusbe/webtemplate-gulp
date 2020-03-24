var $ = require("jquery");
import player from "ztgamejs/gplayer/"
console.log(player);
$(function () {
	var mplayer = new player({
		file: "https://videogame.ztgame.com.cn/zt2m/20191121/888-157431738033.mp4",
		width: 800,
		auto: true,
		height: "auto",
		pc: {},
		download: false,
		mobile: {
			width: "100%",
			height: 'auto'
		}
	});
	$(".play_btn").click(function () {
		mplayer.play();
	});
	setTimeout(mplayer.play,1000);

	//
});
