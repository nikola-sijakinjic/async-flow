var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;

var assert = require('assert');
var request = require('request');
var rp = require('request-promise');

var chai = require('chai');
var chaiHttp = require('chai-http');
const bb = require('bluebird');

var async = require('async');

var btc = require('./transactional/btcRequestRollback')
async.waterfall([
	function reserveFunds(callback) {
		console.log("reserveFunds");
		btc.request(callback)
	},
	function saveLogToDatabase(arg1, callback) {
		console.log("seccond method");
		callback(null, 'three');
	},
	function (arg1, callback) {
		console.log("third method");
		callback(null, 'done');
	}
], function (err, result) {
	if (err != null) {
		console.log("Failed");
	} else {
		console.log("Success");
	}
});

// Or, with named functions:

