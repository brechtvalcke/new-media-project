var socket = io.connect('localhost');
socket.on("connected",function(data){
        console.log("socket connected");
    });
