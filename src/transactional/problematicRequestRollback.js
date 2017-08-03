var rp = require('request-promise');


var btcUrl = 'https://asdasdasdas'
var btcUrlRollback = 'https://jsonplaceholder.typicode.com/post/2'

module.exports = {
	request: rp(btcUrl),
	rollback: rp(btcUrlRollback)
}