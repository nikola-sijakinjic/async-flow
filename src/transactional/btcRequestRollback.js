var rp = require('request-promise');


var btcUrl = 'https://api.coindesk.com/v1/bpi/currentprice.json'
// var btcUrl = 'https://asdas'
var btcUrlRollback = 'http://jsonplaceholder.typicode.com/posts/1'


module.exports.request = function () { return rp(btcUrl) };
module.exports.rollback = function () { return rp(btcUrlRollback); };