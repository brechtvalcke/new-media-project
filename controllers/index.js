var mysql = require("../project_modules/mysqlaccess.js");
var conn=mysql.getConnection();
var lightapi = require('./lightapi.js');
var airapi = require('./airapi.js');
var soundapi = require('./airapi.js');
var tempapi = require('./tempapi.js');
var pressureapi = require('./pressureapi.js');
var humidityapi = require('./humidityapi.js');

module.exports.set = function(app){
    lightapi.set(app,conn);
    airapi.set(app,conn);
    soundapi.set(app,conn);
    tempapi.set(app,conn);
    pressureapi.set(app,conn);
    humidityapi.set(app,conn);
};
