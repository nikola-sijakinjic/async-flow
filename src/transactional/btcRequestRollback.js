var rp = require('request-promise');

function btc(waterfall) {
	ctx = [];
	rp('https://newton.now.sh/factor/1')
		.then(function (json) {
			console.log("reserver succeded", json);

			// rolback if later operation fails
			ctx.push(function () {
				console.log('push succeded');
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

module.exports = btc;