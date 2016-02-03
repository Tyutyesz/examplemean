/**
 * Created by Mátyás on 2016.02.03..
 */

module.exports = function(app){

    app.get('/api', function (req, res) {
        res.send('Ecomm API is running');
    });

    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load our public/index.html file
    });



};