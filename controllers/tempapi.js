module.exports.set = function(app){
    /*  @api tempsensor
*   @var int          | temp_s_id     [record id]
*   @var date         | temp_s_date   [current date]
*   @var float        | temp_s_value  [unit of temperature in celsius]
*/
app.get('/api/tempsensor', function(req, res) {
  connection.query('SELECT * FROM tempsensor', function(err, rows, fields) {
    if (!err){
        res.json(rows);
    }
    else {
      res.json('Failed to fetch rows from the tempsensor table.');
    }
  });
});

app.get('/api/tempsensor/:date/:date2', function(req, res) {
  var date = req.params.date;
  var date2 = req.params.date2;
  connection.query('SELECT * FROM tempsensor WHERE temp_s_date BETWEEN "'+date+'" AND "'+date2+'"', function(err, rows, fields) {
    if (!err){
        res.json(rows);
    }
    else {
      res.json('Failed to fetch rows from the tempsensor table.');
    }
  });
});

app.post('/api/tempsensor', function (req, res) {
  var date = req.body.date;
  var value = req.body.value;
  connection.query('INSERT INTO tempsensor (temp_s_date,temp_s_value) VALUES ("'+date+'","'+value+'")', function(err, rows, fields) {
    if (!err){
        res.json("OK");
    }
    else {
      res.json('Failed to insert rows into the tempsensor table.');
    }
  });
});
}