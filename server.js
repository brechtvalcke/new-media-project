var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');

var controllers = require('./controllers');
var emitQueue = [];
var settings={alarms:[],alarmActive:false};
controllers.set(app, emitQueue, fs,settings);

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
    setInterval(function() {
        emitter();
    }, 10);

    function emitter() {
        if (emitQueue[0]) {
            io.emit(emitQueue[0].emitString, emitQueue[0].emitData);
            emitQueue.splice(0,1);

        }
    }
});
app.use(express.static('public'));


app.get("/", function(req, res) {
    fs.createReadStream("./public/index.html").pipe(res);
});
server.listen(80);
