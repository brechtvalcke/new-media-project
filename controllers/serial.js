module.exports.set = function(app, conn) {

    var SerialPort = require('serialport');

    var parsers = SerialPort.parsers;

    var port = new SerialPort('/dev/ttyUSB0', {
        baudrate: 9600,
        parser: parsers.readline('\r\n')
    });

    port.on('open', function() {
        console.log('Port open');
        setTimeout(function(){
          port.write("12", function(err, results) {

            });
         }, 3000);

    });

    port.on('data', function(data) {
        data = data.substr(0, data.length - 1);
        var parts = data.split(":");
        switch (parts[0]) {
            case "light":
                //console.log("light:" + parts[1]);
                break;
            case "button":
                if (parts[1] === "0") {
                    //console.log("button off");
                } else {
                    //console.log("button on");

                }
                break;
            case "cData":
            console.log("res recieved");
                console.log(parts[1]);
                break;
                default:

        }

    });

};
