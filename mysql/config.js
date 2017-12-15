var mysql=require('mysql');
var pool=mysql.createPool({
	host:'localhost',
	user:'root',
	password:'root',
	database:'yhqq_blog',
	port:3306
})

module.exports = pool;