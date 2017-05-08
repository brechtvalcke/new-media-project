var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');

var settings={alarms:[],alarmActive:false};
fs.readFile('./settings/settings.json', function read(err, fileData) {
    if (err) {
        throw err;
    }
    var settingsFile;
    var errorOnRead = false;

        try {
            settingsFile = JSON.parse(fileData);
        } catch (e) {
            console.log("skipping iterated task");
            errorOnRead = true;
        }
    if (!errorOnRead) {
      settings=settingsFile;
    }
  });

io.on('connection', function(socket) {
    console.log("socket connected");
    socket.emit('connected');
    socket.on("init", function(data) {
                settings.alarms.forEach(function(alarm) {
                    socket.emit("alarmAdded", alarm);
                });
    });
    socket.on('addAlarm', function(data) {
                settings.alarms.push(data);
                socket.broadcast.emit("alarmAdded", data);
    });
    socket.on("activateAlarm",function(data){
              settings.alarmActive = true;
    });
    socket.on("switchLight",function(){
      settings.switchLight=true;
    });
    socket.on("removeAlarm", function(data) {

                var tempAlarms = [];

                settings.alarms.forEach(function(alarm) {
                    if (data.timestamp.min == alarm.timestamp.min & data.timestamp.hour == alarm.timestamp.hour) {
                        socket.broadcast.emit("externalRemoveAlarm", alarm);
                    } else {
                        tempAlarms.push(alarm);
                    }
                });
                settings.alarms = tempAlarms;
    });

});
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
            io.emit("door",parts[1]);


            settings = checkIfAlarm(settings, doorOpened);
            break;
            case "motion":
              io.emit("motion",parts[1]);
              checkForLight(parts[1]);
            break;
        default:

    }

});
var lightOn=false;
function checkForLight(motion){
if (!lightOn){


if (motion>0){
  io.emit("light",true);
  port.write("3", function(err, results) {
    lightOn=true;
  });
  setTimeout(function(){
    port.write("4", function(err, results) {

    });
    io.emit("light",false);
    lightOn=false;
   }, 30000);
}
}
if (settings.switchLight){

if(lightOn){
  port.write("4", function(err, results) {

  });
  io.emit("light",false);
  lightOn=false;
}else{
  io.emit("light",true);
  port.write("3", function(err, results) {
    lightOn=true;
  });
  setTimeout(function(){
    port.write("4", function(err, results) {

    });
    io.emit("light",false);
    lightOn=false;
   }, 30000);
}
settings.switchLight=false;
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
    exec('start wmplayer "D:/schoolprojecten/new media project/alarm.mp3"', (error, stdout, stderr) => {
    if (error) {
      return;
    }
  });
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
                  io.emit("externalRemoveAlarm",alarm);
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
        io.emit("alarm",true);
    } else {
        port.write("2", function(err, results) {

        });
        MakeAlarmSound(false);
        io.emit("alarm",false);
    }
}
app.use(express.static('public'));
app.get("/", function(req, res) {
    fs.createReadStream("./public/index.html").pipe(res);
});
server.listen(80);
var ON_DEATH = require('death'); //this is intentionally ugly

ON_DEATH(function(signal, err) {
  fs.writeFile('./settings/settings.json', JSON.stringify(settings),function(err){
    console.log("saving to file and closing down");
    process.exit();
  });

});
