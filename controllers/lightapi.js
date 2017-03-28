module.exports.set = function(app){
    /*  @api lightsensor
    *   @var int          | light_s_id    [record id]
    *   @var date         | light_s_date  [current date]
    *   @var float        | light_s_value [numerical representation of the intensity of light]
    */
    app.get('/api/lightsensor', function(req, res) {
    connection.query('SELECT * FROM lightsensor', function(err, rows, fields) {
        if (!err){
            res.json(rows);
        }
        else {
        res.json('Failed to fetch rows from the lightsensor table.');
        }
    });
    });

    //test: http://localhost:3000/api/lightsensor/20010310/2001-03-10T23:10:00.000Z
    app.get('/api/lightsensor/:date/:date2', function(req, res) {
    var date = req.params.date;
    var date2 = req.params.date2;
    connection.query('SELECT * FROM lightsensor WHERE light_s_date BETWEEN "'+date+'" AND "'+date2+'"', function(err, rows, fields) {
        if (!err){
            res.json(rows);
        }
        else {
        res.json('Failed to fetch rows from the lightsensor table.');
        }
    });
    });

    app.post('/api/lightsensor', function (req, res) {
    var date = req.body.date;
    var value = req.body.value;
    connection.query('INSERT INTO lightsensor (light_s_date,light_s_value) VALUES ("'+date+'","'+value+'")', function(err, rows, fields) {
        if (!err){
            res.json("OK");
        }
        else {
        res.json('Failed to insert rows into the lightsensor table.');
        }
    });
});
}