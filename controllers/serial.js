module.exports.set = function(app, fs,emitQeue) {
    // {"timestamp":{"hour":11,"min":12}}
    var SerialPort = require('serialport');

    var parsers = SerialPort.parsers;
    // serverport : '/dev/ttyUSB0'
    var port = new SerialPort('COM4', {
        baudrate: 9600,
        parser: parsers.readline('\r\n')
    });
    var lastAlarm={timestamp:{hour:undefined,min:undefined}};
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

                    case "1023":
                        doorOpened = false;
                        break;
                    case "0":
                        doorOpened = true;
                }
                emitQeue.push({emitString:"door",emitData:parts[1]});

                fs.readFile('./settings/settings.json', function read(err, data) {
                    if (err) {
                        throw err;
                    }
                    fileRead(data, doorOpened);
                });
                break;
                case "motion":
                  emitQeue.push({emitString:"motion",emitData:parts[1]});
                  checkForLight(parts[1]);
                break;
            default:

        }

    });
    var lightOn=false;
function checkForLight(motion){
  if (!lightOn){


    if (motion>0){
      emitQeue.push({emitString:"light",emitData:true});
      port.write("3", function(err, results) {
        lightOn=true;
      });
      setTimeout(function(){
        port.write("4", function(err, results) {

        });
        emitQeue.push({emitString:"light",emitData:false});
        lightOn=false;
       }, 30000);
    }
  }
}
    function fileRead(data, doorOpened) {
        var errorOnRead = false;
        var settings;
        try {
            settings = JSON.parse(data);
        } catch (e) {
            try {
                settings = JSON.parse(data);
            } catch (e) {
                console.log("app crashed because of settings file reading. Ignoring read");
                errorOnRead=true;
            }
        }
        if (!errorOnRead) {

            settings = checkIfAlarm(settings, doorOpened);
            fs.writeFile('./settings/settings.json', JSON.stringify(settings),function(err){});
        }

    }
    var playingSound=false;
    var intervalSoundStart;
          var exec = require('child_process').exec;
function MakeAlarmSound(enable){
  if (enable){
    if (!playingSound){

      //taskkill /im wmplayer.exe /F
        exec('start wmplayer "D:/schoolprojecten/new media project/alarm.mp3"', (error, stdout, stderr) => {
        if (error) {
          return;
        }
      });
      intervalSoundStart=setInterval(function() {
        exec('taskkill /im wmplayer.exe /F', (error, stdout, stderr) => {
        if (error) {
          return;
        }
      });
      exec('start wmplayer "D:/schoolprojecten/new media project/alarm.mp3"', (error, stdout, stderr) => {
      if (error) {
        return;
      }
    });
  }, 10000);
      playingSound=true;
    }

  }else{
    if(playingSound){
      clearInterval(intervalSoundStart);
      exec('taskkill /im wmplayer.exe /F', (error, stdout, stderr) => {
      if (error) {
        return;
      }
    });
    playingSound=false;
    }
  }
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
                    if (lastAlarm.timestamp.min == alarm.timestamp.min & lastAlarm.timestamp.hour == alarm.timestamp.hour) {
emitQeue.push({emitString:"externalRemoveAlarm",emitData:alarm});
                    } else {
                        tempAlarms.push(alarm);
                    }
                });
                settings.alarms = tempAlarms;
                console.log("disabling alarm");
            }else{
              enableDisableAlarm(true);
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
            MakeAlarmSound(true);
            emitQeue.push({emitString:"alarm",emitData:true});
        } else {
            port.write("2", function(err, results) {

            });
            MakeAlarmSound(false);
            emitQeue.push({emitString:"alarm",emitData:false});
        }

    }

};
