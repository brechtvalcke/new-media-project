var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Ib123456',
  database : 'sodaqmbili'
});

module.exports = {
    getConnection : function(){
        connection.connect();
        return connection;
    }
}
