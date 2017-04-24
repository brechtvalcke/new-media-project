var express = require("express");
var app = express();

var fs = require('fs');
var path = require("path");
var bodyParser = require('body-parser');

var controllers = require('./controllers');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


controllers.set(app);

app.use(express.static('public'));

app.get("*",function(req,res){
  fs.createReadStream("./public/index.html").pipe(res);
});

app.listen(80);
