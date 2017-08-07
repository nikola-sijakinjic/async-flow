var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;

var assert = require('assert');
var request = require('request');
var chai = require('chai');
var chaiHttp = require('chai-http');
var rp = require('request-promise');

chai.use(chaiHttp);


var mongoclient = new MongoClient(new Server("localhost", 27017), { native_parser: true });
var request = require('request');

btc = require('./transactional/btcRequestRollback.js')

async function tryAsync(url) {
	var ctx = [];
	try {
		console.log("tryAsync called");

		var btcPrice = await btc.request();
		console.log('btc response: ', btcPrice);
		ctx.push(btc.rollback);

		console.log("ctx :", ctx);
		var ethPrice = await x(url);  // this one should fail
		ctx.push(rb(btcUrlRollback));
		console.log(ethPrice);

	} catch (err) {
		console.log("transaction failed", err);
		try {
			while (ctx && ctx.length > 0) {
				let rollback = ctx.pop();
				let val = await rollback();
				console.log("rollback res ", val);
			}
		} catch (error) {
			console.log("failure during fail : ", error);
		}
		console.log("all catch ended");
	}
}



tryAsync("https://staging-davos.heybrolly.com/users");

console.log("EXIT AT END");
// process.exit(1);

