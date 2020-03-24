import BGM  from "ztgamejs/bgsound";
var $ = require("jquery");
var bgm = new BGM({
	file: "http://www.ztgame.com/act/30th/sound/bg.mp3",
	onpause: function() {
		//alert("pause");
	},
	onplay: function() {
		//alert("play");
	}
});
// console.log(bgm);
$(function() {
	$(".pause_btn").click(function() {
		bgm.pause();
	});
	$(".play_btn").click(function() {
		bgm.play();
	});
});
