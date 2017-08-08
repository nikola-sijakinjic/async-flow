var rp = require('request-promise');
var axios = require('axios');

axios.interceptors.response.use(function (response) {
	// Do something with response data
	return response;
}, function (error) {
	if (error.response.status == 404) {
		return Promise.resolve(error.response);
	}
	return Promise.reject(error);
});

function btc(waterfall) {
	ctx = [];
	axios.get('http://localhost:4321/2')
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
			console.log("err - ", err)
			waterfall(err, ctx);
		});

}

module.exports = btc;