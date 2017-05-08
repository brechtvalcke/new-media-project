var socket = io.connect('http://localhost/');
socket.on('connected', function(data) {
  clearAllAlarms();
    socket.emit("init");

});
$(document).ready(function() {

    init();
});
function clearAllAlarms(){
  var alarmsElems = document.querySelectorAll("#alarms tr");
  alarmsElems.forEach(function(alarm){
    removeWithId(alarm.id);
  });
}
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
        socket.emit("activateAlarm");
    });
    $("#lightSwitch").click(function() {
        console.log("switch light");
        socket.emit("switchLight");
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

function addAlarmToView(hr, min) {
    var id = Math.floor((Math.random() * 10000) + 1);
    $("#alarms").append("<tr id='row" + id + "'><td id='alarm" + id + "'>" + hr + ":" + min + "</td><td><button id='btn" + id + "' class='btn btn-danger'>Delete</button></td></tr>");
    $("#btn" + id).click(function() {
        $("#row" + id).remove();
        removeAlarm(hr, min);
    });
}
socket.on("motion",function(data){
  document.getElementById("motionValue").innerHTML=data;
});
socket.on("light",function(status){
  if(status){
    document.getElementById("lightValue").innerHTML="On";
  }else{
    document.getElementById("lightValue").innerHTML="Off";
  }

});
socket.on("alarmAdded", function(data) {
    addAlarmToView(data.timestamp.hour, data.timestamp.min);
});

function removeWithId(id) {
    var elem = document.getElementById(id);
    return elem.parentNode.removeChild(elem);
}

function setNewAlarm(hr, min) {
    addAlarmToView(hr, min);
    socket.emit("addAlarm", {
        timestamp: {
            hour: hr,
            min: min
        }
    });
    //socked data to add alarm (hr, min)
}
socket.on("door", function(data) {
    switch (data) {

        case "1023":
            document.getElementById("doorStatus").innerHTML = "closed";
            break;
        case "0":
            document.getElementById("doorStatus").innerHTML = "opened";
            doorOpened = true;
    }
});
socket.on("alarm", function(alarmstatus) {
  console.log("alarm",alarmstatus);
    if (alarmstatus) {
        document.getElementById("alarmValue").innerHTML = "On";
    } else {
        document.getElementById("alarmValue").innerHTML = "Off";
    }
});
socket.on("externalRemoveAlarm", function(data) {
  console.log(data);
    var alarms = document.querySelectorAll("#alarms tr");
    alarms.forEach(function(alarm) {
        var idnumber = alarm.id.substring(3, alarm.id.length);
        var time = document.getElementById("alarm" + idnumber);
        if (time.innerHTML == data.timestamp.hour + ":" + data.timestamp.min) {
            removeWithId(alarm.id);
        }

    });

});

function removeAlarm(hr, min) {
    //socked data to remove alarm
    socket.emit("removeAlarm", {
        timestamp: {
            hour: hr,
            min: min
        }
    });
}
