/**
 * Created by Mátyás on 2016.02.03..
 */
var app = angular.module('myApp');

app.controller('mainController', function($scope,$http ){
   $scope.teszt = 'World';
   $scope.myPerson = [];

   var getItems = function(){
      console.log('kérem');
      $http({method: 'GET', url: 'http://localhost:8888/api/persons', headers: { 'X-Parse-Application-Id':'XXXXXXXXXXXXX', 'X-Parse-REST-API-Key':'YYYYYYYYYYYYY'}})
          .success(function(data, status){
             $scope.myPerson = data;
             console.log($scope.myPerson);
          }).error( function(data, status){
             console.log(status);
          });
   };
   getItems();
});