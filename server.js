var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');

var controllers = require('./controllers');
var emitQeue = [];
controllers.set(app, emitQeue, fs);

io.on('connection', function(socket) {
    console.log("socket connected");
    socket.emit('connected');
    socket.on("init", function(data) {
        fs.readFile('./settings/settings.json', function read(err, fileData) {
            if (err) {
                throw err;
            }
            var settings;
            var errorOnRead = false;
            try {
                settings = JSON.parse(fileData);
            } catch (e) {
                try {
                    settings = JSON.parse(fileData);
                } catch (e) {
                    console.log("app crashed because of settings file reading. Ignoring read");
                    errorOnRead = true;
                }
            }
            if (!errorOnRead) {
                settings.alarms.forEach(function(alarm) {
                    socket.emit("alarmAdded", alarm);
                });

            }

        });
    });
    socket.on('addAlarm', function(data) {

        fs.readFile('./settings/settings.json', function read(err, fileData) {
            if (err) {
                throw err;
            }
            var settings;
            var errorOnRead = false;
            try {
                settings = JSON.parse(fileData);
            } catch (e) {
                try {
                    settings = JSON.parse(fileData);
                } catch (e) {
                    console.log("app crashed because of settings file reading. Ignoring read");
                    errorOnRead = true;
                }
            }
            if (!errorOnRead) {
                settings.alarms.push(data);
                socket.broadcast.emit("alarmAdded", data);
                fs.writeFile('./settings/settings.json', JSON.stringify(settings),function(err){});
            }

        });
    });
    socket.on("activateAlarm",function(data){
      fs.readFile('./settings/settings.json', function read(err, fileData) {
          if (err) {
              throw err;
          }
          var settings;
          var errorOnRead = false;
          try {
              settings = JSON.parse(fileData);
          } catch (e) {
              try {
                  settings = JSON.parse(fileData);
              } catch (e) {
                  console.log("skipping iterated task");
                  errorOnRead = true;
              }
          }
          if (!errorOnRead) {
            console.log("enabling alarm");
              settings.alarmActive = true;

              fs.writeFile('./settings/settings.json', JSON.stringify(settings),function(err){});
          }

      });
    });
    socket.on("removeAlarm", function(data) {
        fs.readFile('./settings/settings.json', function read(err, fileData) {
            if (err) {
                throw err;
            }
            var settings;
            var errorOnRead = false;
            try {
                settings = JSON.parse(fileData);
            } catch (e) {
                try {
                    settings = JSON.parse(fileData);
                } catch (e) {
                    console.log("app crashed because of settings file reading. Ignoring read");
                    errorOnRead = true;
                }
            }
            if (!errorOnRead) {
                var tempAlarms = [];

                settings.alarms.forEach(function(alarm) {
                    if (data.timestamp.min == alarm.timestamp.min & data.timestamp.hour == alarm.timestamp.hour) {
                        socket.broadcast.emit("externalRemoveAlarm", alarm);
                    } else {
                        tempAlarms.push(alarm);
                    }
                });
                settings.alarms = tempAlarms;

                fs.writeFile('./settings/settings.json', JSON.stringify(settings),function(err){});
            }

        });

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
