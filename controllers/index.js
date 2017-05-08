
var serialport = require("./serial.js");
var socketio = require("./socketio.js");

module.exports.set = function(app,emitQeue,fs,settings){
    serialport.set(app,fs,emitQeue,settings);
};
