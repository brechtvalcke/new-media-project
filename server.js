var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');
server.listen(80);
var controllers = require('./controllers');
controllers.set(app, io, fs);
io.on('connection', function(socket) {
    console.log("user connected");
    socket.emit('connected', {
        hello: 'world'
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
                fs.writeFile('./settings/settings.json', JSON.stringify(settings));
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

                    } else {
                        tempAlarms.push(alarm);
                    }
                });
                settings.alarms = tempAlarms;
                fs.writeFile('./settings/settings.json', JSON.stringify(settings));
            }

        });

    });
});
app.use(express.static('public'));

app.get("/", function(req, res) {
    fs.createReadStream("./public/index.html").pipe(res);
});
