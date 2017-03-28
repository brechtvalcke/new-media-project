var express = require("express");
var app = express();

var fs = require('fs');
var path = require("path");
var bodyParser = require('body-parser');

var controllers = require('./controllers');

var mysql = require("./project_modules/mysqlaccess.js");
connection = mysql.getConnection();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

controllers.set(app);

app.listen(3000);