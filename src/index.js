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
		console.log("reserveFunds ");
		rp(options)
			.then(function (json) {
				console.log("jsonString  --", json);
				callback(null, json);
			})
			.catch(function (err) {
				console.log("err  in reserver");

				callback(err, null);
			});
	},
	function (arg1, callback) {
		console.log("err ");
		callback(null, 'three');
	},
	function (arg1, callback) {
		// arg1 now equals 'three'
		callback(null, 'done');
	}
], function (err, result) {
	console.log("Failed");
});

// Or, with named functions:

