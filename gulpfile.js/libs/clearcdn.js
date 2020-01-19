var apiUrl = "http://gos.ztgame.com/cdn/action.php";
var request = require("request");
async function clearCdn(type, url) {
	return new Promise((resolve, reject) => {
		request.post({ url: apiUrl, formData: { type: type, content: url } }, function(error, response, body) {
			if (!error && response.statusCode == 200) {
				var res = JSON.parse(body);
				if (res.ret == 0) {
					resolve(true);
				} else {
					resolve(false);
				}
			}
		});
	});
}
module.exports = clearCdn;
