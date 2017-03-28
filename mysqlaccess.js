var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'usbw',
  port: 3307,
  database : 'sodaqmbili'
});

// http://codetheory.in/fixing-node-mysql-error-cannot-enqueue-handshake-after-invoking-quit/


module.exports = {
    getConnection : function(){
        connection.connect();
        return connection;
    }
}