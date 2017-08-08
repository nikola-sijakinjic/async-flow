var axios = require('axios');


btc = require('./transactional/btcRequestRollback.js')
problem = require('./transactional/problematicRequestRollback.js')

async function tryAsync() {
	var ctx = [];
	try {
		console.log("tryAsync called");

		var btcPrice = await btc.request();
		console.log('btc response: ', btcPrice.data);
		ctx.push(btc.rollback);

		var ethPrice = await problem.request();  // this one should fail
		console.log("ctx :", ctx);
		ctx.push(problem.rollback);
		console.log("eth - ", ethPrice.status);

	} catch (err) {
		console.log("transaction failed", err);
		try {
			while (ctx && ctx.length > 0) {
				let rollback = ctx.pop();
				let val = await rollback();
				console.log("rollback res ", val.status);
			}
		} catch (error) {
			console.log("failure during fail : ", error);
		}
		console.log("all catch ended");
	}
}



tryAsync();

console.log("EXIT AT END");
// process.exit(1);

