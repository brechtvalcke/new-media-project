module.exports.set = function(app,conn){
  var SerialPort = require('serialport');

  var parsers = SerialPort.parsers;

  var port = new SerialPort('/dev/ttyUSB0', {
    baudrate: 9600,
    parser: parsers.readline('\r\n')
  });

  port.on('open', function() {
    console.log('Port open');
  });

  port.on('data', function(data) {

    data=data.substr(0,data.length -1);
    var parts = data.split(":");
    switch(parts[0]){
      case "licht":

      break;
      case "lucht":
      conn.query('INSERT INTO airsensor (air_s_date,air_s_value) VALUES ("'+Date.now()+'","'+parts[1]+'")', function(err, rows, fields) {
        if (!err){
          console.log("added lucht");
        }
        else {
        }
      });
      break;

    }

  });
};
