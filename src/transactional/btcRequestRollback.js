var axios = require('axios');

var btcUrl = 'http://localhost:4321/'
// var btcUrl = 'https://asdas'
var btcUrlRollback = 'http://localhost:4321/'

axios.interceptors.response.use(function (response) {
	// console.log(response);
	return response;
}, function (error) {
	if (error.response.status == 404) {
		return Promise.resolve(error.response);
	}
	return Promise.reject(error);
});

module.exports.request = function () { return axios.get(btcUrl) };
module.exports.rollback = function () { return axios.get(btcUrlRollback); };

