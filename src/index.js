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

var as = require('async');
var btc = require('./transactional/btcRequestRollback');
//var trouble = require('./transactional/problematicRequestRollback');



var reserveFunds = async function () {
	console.log("resere funds  : ");
	var ctx = [];
	return [ctx];
}
var logToDatabase = async function logToDatabase([ctx]) {
	try {
		var result = await btc.request();
		ctx.push(btc.rollback);
		console.log("log to database context : ", ctx);
	} catch (err) {
		ctx.push(btc.rollback);
	}
	return [ctx];
}

var buyInsurance = function buyInsurance([ctx]) {
	console.log('buyInsurance context ', ctx);
	return [null, ctx, "whool"];
}

as.waterfall([
	reserveFunds,
	logToDatabase,
	buyInsurance
], function (err, ctx, result) {
	if (err != null) {
		console.log(err);
		rollbackAll();
	} else {
		console.log(ctx);
	}
	console.log("ctx", ctx);

});



console.log("EXIT AT END");
// process.exit(1);




