/**
 * Created by Mátyás on 2016.02.03..
 */
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    methodOverride = require('method-override');

var port = 8888;


var db = 'mongodb://localhost:27017/myDb/persons';

var Person = require('./app/models/persons');

mongoose.connect(db, function(err) {
    if (err) {
        throw err;
    } else {
        console.log('Mongoose is connected');
    }
});

var findPersons = function(db, callback) {
    var cursor =db.collection('persons').find( );
    cursor.each(function(err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            console.dir(doc);
        } else {
            callback();
        }
    });
};

app.use(bodyParser.json());

app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride('X-HTTP-Method-Override'));

app.use(express.static(__dirname + '/public'));

//require('./app/routes')(app); // configure our routes

var router = express.Router();

app.get('/api', router);

app.get('/', function(req, res) {
    res.sendfile('./public/index.html'); // load our public/index.html file
});

router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

app.use('/api', router);

router.route('/persons')

    // create a bear (accessed at POST http://localhost:8888/api/persons)
    .post(function(req, res) {

        var person = new Person();      // create a new instance of the Persons model
        person.name = req.body.name;  // set the person name (comes from the request)

        // save the bear and check for errors
        person.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Person created!' });
        });

    })
    .get(function(req, res) {
        Person.find(function(err, persons) {
            if (err)
                res.send(err);

            res.json(persons);
        });
    });

router.route('/persons/:person_id')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        Person.findById(req.params.person_id, function(err, person) {
            if (err)
                res.send(err);
            res.json(person);
        });
    })
    .put(function(req, res) {

        // use our bear model to find the bear we want
        Person.findById(req.params.person_id, function(err, person) {

            if (err)
                res.send(err);

            person.name = req.body.name;  // update the bears info

            // save the bear
            person.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Person updated!' });
            });

        });
    })
    .delete(function(req, res) {
        Person.remove({
            _id: req.params.person_id
        }, function(err, person) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });


app.listen(port);

// shoutout to the user
console.log('Listening on: ' + port + ' port');

// expose app
exports = module.exports = app;