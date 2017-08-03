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

var url = 'mongodb://localhost:27017/test';
var unos = {
	"address": {
		"street": "2 Avenue",
		"zipcode": "10075",
		"building": "1480",
		"coord": [-73.9557413, 40.7720266]
	}
};

var async = require('async');



async.waterfall([
	function (callback) {
		callback(null, 'one', 'two');
	},
	function (arg1, arg2, callback) {
		// arg1 now equals 'one' and arg2 now equals 'two'
		callback(null, 'three');
	},
	function (arg1, callback) {
		// arg1 now equals 'three'
		callback(null, 'done');
	}
], function (err, result) {
	// result now equals 'done'
});

// Or, with named functions:
async.waterfall([
	reserveFunds,
	logToDatabase,
	buyInsurance
], function (err, ctx, result) {
	console.log("err ", err);
	console.log("ctx ", ctx);
	console.log("result ", result);
});


function reserveFunds(callback) {
	console.log('reserve')
	ctx = [];
	callback(null, ctx);
}
function logToDatabase(ctx, callback) {
	console.log('logToDatabase')
	callback(null, ctx);
}
function buyInsurance(ctx, callback) {
	console.log('buyInsurance')
	callback(null, ctx);
}



console.log("EXIT AT END");
// process.exit(1);

