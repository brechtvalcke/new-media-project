var mysql = require("./project_modules/mysqlaccess.js");
connection = mysql.getConnection();

module.exports.set = function(app){
    /*  @api pressuresensor
*   @var int          | pressure_s_id     [record id]
*   @var date         | pressure_s_date   [current date]
*   @var float        | pressure_s_value  [pascal unit (hPa) which represents internal pressure]
*/
app.get('/api/pressuresensor', function(req, res) {
  connection.query('SELECT * FROM pressuresensor', function(err, rows, fields) {
    if (!err){
        res.json(rows);
    }
    else {
      res.json('Failed to fetch rows from the pressuresensor table.');
    }
  });
});

app.get('/api/pressuresensor/:date/:date2', function(req, res) {
  var date = req.params.date;
  var date2 = req.params.date2;
  connection.query('SELECT * FROM pressuresensor WHERE pressure_s_date BETWEEN "'+date+'" AND "'+date2+'"', function(err, rows, fields) {
    if (!err){
        res.json(rows);
    }
    else {
      res.json('Failed to fetch rows from the pressuresensor table.');
    }
  });
});

app.post('/api/pressuresensor', function (req, res) {
  var date = req.body.date;
  var value = req.body.value;
  connection.query('INSERT INTO pressuresensor (pressure_s_date,pressure_s_value) VALUES ("'+date+'","'+value+'")', function(err, rows, fields) {
    if (!err){
        res.json("OK");
    }
    else {
      res.json('Failed to insert rows into the pressuresensor table.');
    }
  });
});
}