var mysql = require("../project_modules/mysqlaccess.js");
connection = mysql.getConnection();

module.exports.set = function(app){
    /*  @api airsensor
*   @var int          | air_s_id      [record id]
*   @var date         | air_s_date    [current date]
*   @var int          | air_s_value   [air quality index slope value]
*/
app.get('/api/airsensor', function(req, res) {
  connection.query('SELECT * FROM airsensor', function(err, rows, fields) {
    if (!err){
        res.json(rows);
    }
    else {
      res.json('Failed to fetch rows from the airsensor table.');
    }
  });
  connection.end();
});

app.get('/api/airsensor/:date/:date2', function(req, res) {
  var date = req.params.date;
  var date2 = req.params.date2;
  connection.query('SELECT * FROM airsensor WHERE air_s_date BETWEEN "'+date+'" AND "'+date2+'"', function(err, rows, fields) {
    if (!err){
        res.json(rows);
    }
    else {
      res.json('Failed to fetch rows from the airsensor table.');
    }
  });
});

app.post('/api/airsensor', function (req, res) {
  var date = req.body.date;
  var value = req.body.value;
  connection.query('INSERT INTO airsensor (air_s_date,air_s_value) VALUES ("'+date+'","'+value+'")', function(err, rows, fields) {
    if (!err){
        res.json("OK");
    }
    else {
      res.json('Failed to insert rows into the airsensor table.');
    }
  });
});
}