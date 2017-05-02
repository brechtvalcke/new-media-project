
var serialport = require("./serial.js");
var socketio = require("./socketio.js");

module.exports.set = function(app,io,fs){

    serialport.set(app,io,fs);
    socketio.set(app,io);
};
