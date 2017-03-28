var mysql = require("../project_modules/mysqlaccess.js");
connection = mysql.getConnection();

module.exports.set = function(app){
    /*  @api loudsensor
*   @var int          | loud_s_id     [record id]
*   @var date         | loud_s_date   [current date]
*   @var int          | loud_s_value  [numerical representation of the loudness of environmental sound as decibel]
*/
app.get('/api/loudsensor', function(req, res) {
  connection.query('SELECT * FROM loudsensor', function(err, rows, fields) {
    if (!err){
        res.json(rows);
    }
    else {
      res.json('Failed to fetch rows from the loudsensor table.');
    }
  });
});

app.get('/api/loudsensor/:date/:date2', function(req, res) {
  var date = req.params.date;
  var date2 = req.params.date2;
  connection.query('SELECT * FROM loudsensor WHERE loud_s_date BETWEEN "'+date+'" AND "'+date2+'"', function(err, rows, fields) {
    if (!err){
        res.json(rows);
    }
    else {
      res.json('Failed to fetch rows from the loudsensor table.');
    }
  });
});

app.post('/api/loudsensor', function (req, res) {
  var date = req.body.date;
  var value = req.body.value;
  connection.query('INSERT INTO loudsensor (loud_s_date,loud_s_value) VALUES ("'+date+'","'+value+'")', function(err, rows, fields) {
    if (!err){
        res.json("OK");
    }
    else {
      res.json('Failed to insert rows into the loudsensor table.');
    }
  });
});
}