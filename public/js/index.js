var socket = io.connect('http://localhost');
$(document).ready(function(){
    init();
});

function init(){
  socket.on("connected",function(data){
      console.log("connected");
  });
    $("#newAlarm").click(function(){
        console.log("new alarm");
        var time = prompt("please enter your time", "12:00");
        if(time != null){
            if(time.includes(":")){
                var parts = time.split(":");
                setNewAlarm(parts[0], parts[1]);
            }
        }
    });
    $("#activateAlarm").click(function(){
        console.log("activate alarm");
    });
    $("#lightSwitch").click(function(){
        console.log("switch light");
    });
}

function setLightValue(value){
    $("#lightValue").html(value);
}

function setMotionValue(value){
    $("#motionValue").html(value);
}

function setAlarmStatus(value){
    $("#alarmValue").html(value);
}

function setDoorStatus(value){
    $("#doorStatus").html(value);
}

function setNewAlarm(hr, min){
    var id = Math.floor((Math.random() * 10000) + 1);
    $("#alarms").append("<tr id='row"+id+"'><td>Alarm</td><td id='alarm"+id+"'>"+hr+":"+min+"</td><td>True</td><td><button id='btn"+id+"' class='btn btn-danger'>Delete</button></td></tr>");
    $("#btn"+id).click(function(){
        $("#row"+id).remove();
        removeAlarm();
    });

    //socked data to add alarm (hr, min)
}

function removeAlarm(){
    //socked data to remove alarm
}
