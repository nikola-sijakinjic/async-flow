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

// var url = 'mongodb://localhost:27017/test';
var unos = {
	"address": {
		"street": "2 Avenue",
		"zipcode": "10075",
		"building": "1480",
		"coord": [-73.9557413, 40.7720266]
	},
	"borough": "Manhattan",
	"cuisine": "Italian",
	"grades": [
		{
			"date": new Date("2014-10-01T00:00:00Z"),
			"grade": "A",
			"score": 11
		},
		{
			"date": new Date("2014-01-16T00:00:00Z"),
			"grade": "B",
			"score": 17
		}
	],
	"name": "Vella",
	"restaurant_id": "41704620"
};


// function insertDocument(db, entry) {
// 	db.collection('restaurants').insertOne(entry).then(function (db) {
// 		console.log("snimljeno");
// 	}).catch(function (err) {
// 		console.log("inserting failed ", err);
// 	});
// };

// MongoClient.connect(url).then(function (db) {
// 	console.log("go insert");
// 	insertDocument(db, unos);
// 	console.log("go inserted");
// }).catch(function (err) {
// 	console.log(err);
// });

// console.log(chai.request('http://localhost:8080')
// 	.get('/v1/bpi/currentprice.json'));

/*
async function tryTransaction(url) {
	rp(url)
		.then(function (resp) {
			console.log(resp);
		})
		.catch(function (err) {
			console.log("Something went wrong");
		});
}
*/

// tryTransaction(url);


/*

rp(url)
	.then(function (htmlString) {
		var recieved = JSON.parse(htmlString);
		console.log(recieved);
	})
	.catch(function (err) {
		console.log('none');
	});
*/

btc = require('./transactional/btcRequestRollback.js')

async function tryAsync(url) {
	var ctx = [];
	try {
		console.log("tryAsync called");

		var btcPrice = await btc.request();
		console.log('btc response: ', btcPrice);
		ctx.push(btc.rollback);

		console.log("ctx :", ctx);
		var ethPrice = await rp(url);  // this one should fail
		ctx.push(rb(btcUrlRollback));
		console.log(ethPrice);

	} catch (err) {
		console.log("transaction failed", ctx);
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



tryAsync("url");

console.log("EXIT AT END");
// process.exit(1);

