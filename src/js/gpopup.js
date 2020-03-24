var $ = require("jquery");
import Popup from "ztgamejs/gpopup";
var popup = new Popup(".popup");
$(".show_btn").click(function () {
	popup.show(".popup2");
});
