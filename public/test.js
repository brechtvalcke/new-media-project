var socket = io.connect('http://172.23.6.21/');
socket.on("connected",function(data){
        console.log("socket connected");
    });
