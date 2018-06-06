var mysql      = require('mysql');
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'mM13542423239,',
  database : 'news',
  port: 3306
});
module.exports = db;