var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;

var async = require('async');

var btc = require('./transactional/btcRequestRollback')
var problem = require('./transactional/problematicRequestRollback.js')


async.waterfall([
	btc
	,
	function saveLogToDatabase(ctx, waterfall) {

		// async.parallel([
		// 	btc, btc
		// ]);

		console.log("say what");
		waterfall(null, ctx);
	},
	problem
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


