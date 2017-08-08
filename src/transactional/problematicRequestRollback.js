var rp = require('request-promise');


function problem(ctx, waterfall) {
	rp('https://localhost:4321/1')
		.then(function (json) {
			console.log("reserver succeded", json);

			// rolback if later operation fails
			ctx.push(function () {
				rp('https://localhost:4321/2')
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

module.exports = problem;