var rp = require('request-promise');


// var btcUrl = 'https://api.coindesk.com/v1/bpi/currentprice.json'
var btcUrl = 'https://asdas'
var btcUrlRollback = 'http://jsonplaceholder.typicode.com/posts/1'

var options = {
	uri: 'https://newton.now.sh/factor/21',
	headers: {
		'User-Agent': 'Request-Promise'
	},
	json: true // Automatically parses the JSON string in the response
};

var optionsRollback = {
	uri: 'https://newton.now.sh/factor/37',
	headers: {
		'User-Agent': 'Request-Promise'
	},
	json: true // Automatically parses the JSON string in the response
};

function btcRequest(options) {
	return rp(options)
		.then(function (json) {
			console.log("jsonString  --", json);
			callback(null, json);
		})
		.catch(function (err) {
			console.log("err  in reserver");

			callback(err, null);
		});

}

function btcRollback(options) {
	return rp(options)
		.then(function (json) {
			console.log("jsonString  --", json);
			callback(null, json);
		})
		.catch(function (err) {
			console.log("err  in reserver");

			callback(err, null);
		});
}
module.exports.request = btcRequest(options);
module.exports.rollback = btcRollback(optionsRollback) };