/**
 * Created by Mátyás on 2016.02.03..
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PersonSchema = new Schema({
   name: String,
    id: Number,
    age: Number
});

module.exports = mongoose.model('Person', PersonSchema);