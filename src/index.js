var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;

var assert = require('assert');
var request = require('request');
var rp = require('request-promise');

var chai = require('chai');
var chaiHttp = require('chai-http');
const bb = require('bluebird');

var async = require('async');

// var btc = require('./transactional/btcRequestRollback')
// var problem = require('./transactional/problematicRequestRollback.js')


async.waterfall([
	function reserveFunds(waterfall) {
		ctx = [];
		rp('https://newton.now.sh/factor/21')
			.then(function (json) {
				console.log("reserver succeded", json);

				// rolback if later operation fails
				ctx.push(function () {
					rp('https://newton.now.sh/factor/121')
						.then(function (htmlString) {
							console.log("reserve rollback executed");
						})
						.catch(function (err) {
							console.log("FATAL");
						})
				});
				waterfall(null, ctx);
			})
			.catch(function (err) {
				waterfall(err, ctx);
			});
	},
	function saveLogToDatabase(ctx, waterfall) {
		console.log("say what");
		waterfall(null, ctx);
	},
	function (ctx, waterfall) {
		rp('xhttps://newton.now.sh/factor/1')
			.then(function (json) {
				console.log("reserver succeded", json);

				// rolback if later operation fails
				ctx.push(function () {
					rp('https://newton.now.sh/factor/2')
						.then(function (htmlString) {
							console.log("reserve rollback executed");
						})
						.catch(function (err) {
							console.log("FATAL");
						})
				});
				waterfall(null, ctx);
			})
			.catch(function (err) {
				waterfall(err, ctx);
			});

	}
], function (err, ctx) {
	if (err != null) {
		while (ctx.length > 0) {
			console.log("loop");
			rollback = ctx.pop();
			rollback();
		}
	} else {

		console.log("Success");
	};
});


