var lightapi = require('./lightapi.js');
var airapi = require('./airapi.js');
var soundapi = require('./airapi.js');
var tempapi = require('./tempapi.js');
var pressureapi = require('./pressureapi.js');
var humidityapi = require('./humidityapi.js');

module.exports.set = function(app){
    lightapi.set(app);
    airapi.set(app);
    soundapi.set(app);
    tempapi.set(app);
    pressureapi.set(app);
    humidityapi.set(app);
}