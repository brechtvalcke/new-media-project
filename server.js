var express = require("express");
var app = express();

var fs = require('fs');
var path = require("path");
var bodyParser = require('body-parser')

var mysql = require(__dirname + "/project_modules/mysqlaccess.js")
var controllers = require('./controllers')

connection = mysql.getConnection();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

controllers.set(app);

app.listen(3000);