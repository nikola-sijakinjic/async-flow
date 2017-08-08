var rp = require('request-promise');
var axios = require('axios');

function problem(ctx, waterfall) {
	axios.get('https://localhost:4321/1')
		.then(function (json) {
			console.log("reserver succeded", json);

			// rolback if later operation fails
			ctx.push(function () {
				axios.get('https://localhost:4321/2')
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
			console.log("problems do fail");
			waterfall(err, ctx);
		});

}

module.exports = problem;