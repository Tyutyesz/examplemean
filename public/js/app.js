/**
 * Created by Mátyás on 2016.02.03..
 */
var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider){

    $routeProvider
        .when('/', {
            templateUrl:'./views/lists.html',
            controller: 'mainController'
        });
});