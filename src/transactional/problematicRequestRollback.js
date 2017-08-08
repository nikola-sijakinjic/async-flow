var axios = require('axios');

var problem = 'xhttp://localhost:4321/2'
// var problem = 'https://asdas'
var problemRollback = 'http://localhost:4321/1'



module.exports.request = function () { return axios.get(problem) };
module.exports.rollback = function () { return axios.get(problemRollback); };

