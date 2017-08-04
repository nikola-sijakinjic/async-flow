var rp = require('request-promise');


// var problemUrl = 'https://api.coindesk.com/v1/bpi/currentprice.json'
var problemUrl = 'https://asdas'
var problemUrlRollback = 'http://jsonplaceholder.typicode.com/posts/1'

var options = {
	uri: 'https://newton.now.sh/factor/44',
	headers: {
		'User-Agent': 'Request-Promise'
	},
	json: true // Automatically parses the JSON string in the response
};

var optionsRollback = {
	uri: 'https://newton.now.sh/factor/81',
	headers: {
		'User-Agent': 'Request-Promise'
	},
	json: true // Automatically parses the JSON string in the response
};

function btcRequest(callback) {
	return rp(options)
		.then(function (json) {
			console.log("problem request  --", json);
			callback(null, json);
		})
		.catch(function (err) {
			console.log("err  in problem");

			callback(err, null);
		});

}

function btcRollback(callback) {
	return rp(optionsRollback)
		.then(function (json) {
			console.log("problem  respnse: ", json);
			callback(null, json);
		})
		.catch(function (err) {
			console.log("problem  in reserver");
			callback(err, null);
		});
}
module.exports.request = btcRequest;
module.exports.rollback = btcRollback;