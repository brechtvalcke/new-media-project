var socket = io.connect('http://localhost');
socket.on('connected', function(data) {
    socket.emit("init");

});
$(document).ready(function() {
    init();
});

function init() {

    $("#newAlarm").click(function() {
        console.log("new alarm");
        var time = prompt("please enter your time", "12:00");
        if (time !== null) {
            if (time.includes(":")) {
                var parts = time.split(":");
                setNewAlarm(parts[0], parts[1]);
            }
        }
    });
    $("#activateAlarm").click(function() {
        console.log("activate alarm");
    });
    $("#lightSwitch").click(function() {
        console.log("switch light");
    });
}
socket.on("recievedLightValue", function(value) {
    setLightValue(value);
});

function setLightValue(value) {
    $("#lightValue").html(value);
}
socket.on("recievedMotionValue", function(value) {
    setMotionValue(value);
});

function setMotionValue(value) {
    $("#motionValue").html(value);
}
socket.on("recievedAlarmStatus", function(value) {
    setAlarmStatus(value);
});

function setAlarmStatus(value) {
    $("#alarmValue").html(value);
}
socket.on("recievedDoorStatus", function(value) {
    setDoorStatus(value);
});

function setDoorStatus(value) {
    $("#doorStatus").html(value);
}

function setNewAlarm(hr, min) {
    var id = Math.floor((Math.random() * 10000) + 1);
    $("#alarms").append("<tr id='row" + id + "'><td>Alarm</td><td id='alarm" + id + "'>" + hr + ":" + min + "</td><td>True</td><td><button id='btn" + id + "' class='btn btn-danger'>Delete</button></td></tr>");
    $("#btn" + id).click(function() {
        $("#row" + id).remove();
        removeAlarm(hr, min);
    });
    socket.emit("addAlarm", {
        timestamp: {
            hour: hr,
            min: min
        }
    });
    //socked data to add alarm (hr, min)
}

function removeAlarm(hr, min) {
    //socked data to remove alarm
    socket.emit("removeAlarm", {
        timestamp: {
            hour: hr,
            min: min
        }
    });
}
