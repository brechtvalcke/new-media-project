var express = require("express");
var app = express();
var mysql = require('mysql');
var fs = require('fs');
var path = require("path");
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Ib123456',
  database : 'sodaqmbili'
});

// http://codetheory.in/fixing-node-mysql-error-cannot-enqueue-handshake-after-invoking-quit/
connection.connect();

/*  @api lightsensor
*   @var int          | light_s_id    [record id]
*   @var date         | light_s_date  [current date]
*   @var float        | light_s_value [numerical representation of the intensity of light]
*/
app.get('/api/lightsensor', function(req, res) {
  connection.query('SELECT * FROM lightsensor', function(err, rows, fields) {
    if (!err){
        res.json(rows);
    }
    else {
      res.json('Failed to fetch rows from the lightsensor table.');
    }
  });
});

//test: http://localhost:3000/api/lightsensor/20010310/2001-03-10T23:10:00.000Z
app.get('/api/lightsensor/:date/:date2', function(req, res) {
  var date = req.params.date;
  var date2 = req.params.date2;
  connection.query('SELECT * FROM lightsensor WHERE light_s_date BETWEEN "'+date+'" AND "'+date2+'"', function(err, rows, fields) {
    if (!err){
        res.json(rows);
    }
    else {
      res.json('Failed to fetch rows from the lightsensor table.');
    }
  });
});

app.post('/api/lightsensor', function (req, res) {
  var date = req.body.date;
  var value = req.body.value;
  connection.query('INSERT INTO lightsensor (light_s_date,light_s_value) VALUES ("'+date+'","'+value+'")', function(err, rows, fields) {
    if (!err){
        res.json("OK");
    }
    else {
      res.json('Failed to insert rows into the lightsensor table.');
    }
  });
});

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
      res.json({error: "Failed to fetch rows from the humiditysensor table."});
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

app.listen(3000);
