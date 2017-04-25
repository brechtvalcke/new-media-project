module.exports.set = function(app,io){

io.on("connection", function(client) {
    client.emit('connected', {
        connected: true,
    });

});
};
