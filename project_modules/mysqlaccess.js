var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'siebrecht',
  database : 'sodaqmbili'
});

module.exports = {
    getConnection : function(){
        connection.connect();
        return connection;
    }
}
