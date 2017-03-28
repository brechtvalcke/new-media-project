module.exports.set = function(app){
    /*  @api humiditysensor
*   @var int          | humidity_s_id     [record id]
*   @var date         | humidity_s_date   [current date]
*   @var float        | humidity_s_value  [amount of water vapor present in the air as percentage]
*/
app.get('/api/humiditysensor', function(req, res) {
  connection.query('SELECT * FROM humiditysensor', function(err, rows, fields) {
    if (!err){
        res.json(rows);
    }
    else {
      res.json('Failed to fetch rows from the humiditysensor table.');
    }
  });
});

app.get('/api/humiditysensor/:date/:date2', function(req, res) {
  var date = req.params.date;
  var date2 = req.params.date2;
  connection.query('SELECT * FROM humiditysensor WHERE humidity_s_date BETWEEN "'+date+'" AND "'+date2+'"', function(err, rows, fields) {
    if (!err){
        res.json(rows);
    }
    else {
      res.json('Failed to fetch rows from the humiditysensor table.');
    }
  });
});

app.post('/api/humiditysensor', function (req, res) {
  var date = req.body.date;
  var value = req.body.value;
  connection.query('INSERT INTO humiditysensor (humidity_s_date,humidity_s_value) VALUES ("'+date+'","'+value+'")', function(err, rows, fields) {
    if (!err){
        res.json("OK");
    }
    else {
      res.json('Failed to insert rows into the humiditysensor table.');
    }
  });
});

// Default route. Code stops executing after this.
app.get('*',function (req, res){
  res.end("Invalid API request.");
});
}