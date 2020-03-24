import Device from "ztgamejs/device";
var $ = require("jquery");
//
var html = "";
for (var i in Device) {
	html += "<tr>";
	html += "<td>" + i + "</td>";
	html += "<td>" + typeof Device[i] + "</td>";
	html += "<td>" + (typeof Device[i] == "function" ? "" : Device[i]) + "</td>";
	html += "</tr>";
}
$(".device_table").append(html);
