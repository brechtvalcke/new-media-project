var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');

var controllers = require('./controllers');
var emitQueue = [];
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


controllers.set(app, emitQueue, fs,settings);
io.on('connection', function(socket) {
    console.log("socket connected");
    socket.emit('connected');
    socket.on("init", function(data) {

                settings.alarms.forEach(function(alarm) {
                    socket.emit("alarmAdded", alarm);

    });
    socket.on('addAlarm', function(data) {


                settings.alarms.push(data);
                socket.broadcast.emit("alarmAdded", data);
    });
    socket.on("activateAlarm",function(data){

            console.log("enabling alarm");
              settings.alarmActive = true;

    });
    socket.on("removeAlarm", function(data) {

                settings.alarms.forEach(function(alarm) {
                    if (data.timestamp.min == alarm.timestamp.min & data.timestamp.hour == alarm.timestamp.hour) {
                        socket.broadcast.emit("externalRemoveAlarm", alarm);
                    } else {
                        tempAlarms.push(alarm);
                    }
                });
                settings.alarms = tempAlarms;


    });
    setInterval(function() {
        emitter();
    }, 10);

    function emitter() {
        if (emitQeue[0]) {
            io.emit(emitQeue[0].emitString, emitQeue[0].emitData);
            emitQeue.splice(0,1);

        }
    }
});
app.use(express.static('public'));


app.get("/", function(req, res) {
    fs.createReadStream("./public/index.html").pipe(res);
});
server.listen(80);
var ON_DEATH = require('death'); //this is intentionally ugly

ON_DEATH(function(signal, err) {
  fs.writeFile('./settings/settings.json', JSON.stringify(settings),function(err){});
  console("saving to file and closing down");
  process.exit();
});
