module.exports.set = function(app, io, fs) {
// {"timestamp":{"hour":11,"min":12}}
    var SerialPort = require('serialport');

    var parsers = SerialPort.parsers;
    // serverport : '/dev/ttyUSB0'
    var port = new SerialPort('COM4', {
        baudrate: 9600,
        parser: parsers.readline('\r\n')
    });
    var lastAlarm;
    port.on('open', function() {
        console.log('Port open');

    });

    port.on('data', function(data) {
        data = data.substr(0, data.length - 1);
        var parts = data.split(":");
        switch (parts[0]) {
            case "door":
                var doorOpened = false;
                switch (parts[1]) {

                    case "0":
                        doorOpened = false;
                        break;
                    case "1023":
                        doorOpened = true;
                }

                fs.readFile('./settings/settings.json', function read(err, data) {
                    if (err) {
                        throw err;
                    }
                    fileRead(data, doorOpened);
                });
                break;
            default:

        }

    });

    function fileRead(data, doorOpened) {
        var settings = JSON.parse(data);

        settings.sensors.forEach(function(sensor) {
            if (sensor.name === "door") {
                sensor.opened = doorOpened;
            }
        });
        settings = checkIfAlarm(settings, doorOpened);
        fs.writeFile('./settings/settings.json', JSON.stringify(settings));
    }

    function checkIfAlarm(settings, doorOpened) {
        if (!settings.alarmActive) {
            settings.alarms.forEach(function(alarm) {
                var now = getDateTime();
                if (now.hour == alarm.timestamp.hour & now.min == alarm.timestamp.min) {
                    enableDisableAlarm(true);
                    settings.alarmActive = true;
                    console.log("enabling alarm");
                    lastAlarm = alarm;
                }
            });
        } else {
            if (doorOpened) {
                enableDisableAlarm(false);
                settings.alarmActive = false;
                var tempAlarms = [];

                settings.alarms.forEach(function(alarm) {
                  console.log(lastAlarm.timestamp.min == alarm.timestamp.min & lastAlarm.timestamp.hour == alarm.timestamp.hour);
                    if (lastAlarm.timestamp.min == alarm.timestamp.min & lastAlarm.timestamp.hour == alarm.timestamp.hour) {

                    } else {
                        tempAlarms.push(alarm);
                    }
                });
                settings.alarms = tempAlarms;
                console.log("disabling alarm");
            }
        }
        return settings;
    }

    function getDateTime() {

        var date = new Date();

        var hour = date.getHours();
        hour = (hour < 10 ? "0" : "") + hour;

        var min = date.getMinutes();
        min = (min < 10 ? "0" : "") + min;
        return {
            hour: hour,
            min: min
        };
    }

    function enableDisableAlarm(enableOrDisable) {
        if (enableOrDisable) {
            port.write("1", function(err, results) {

            });
        } else {
            port.write("2", function(err, results) {

            });
        }

    }

};
