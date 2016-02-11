'use strict';

var app = angular.module('routingTest', ['ui.router']);




app.config(function($stateProvider, $urlRouterProvider){

  $stateProvider //chain states
    .state('home', {
      url: '/',
      templateUrl: '/partials/home.html'
    })
    .state('list', {
      url: '/liststocks',
      templateUrl: '/partials/list.html',
      controller: 'listControl'
    })
    .state('add', {
      url: '/addstock',
      templateUrl: '/partials/add.html',
      controller: 'addControl'
    })

  $urlRouterProvider.otherwise('/');



});



//TODO LIST THE LIST IN LIST, can addStock have this.stockList instead of var stockList
//


//LIST
app.controller('listControl', function($scope, $state, StockData){
  console.log('listControl');

  $scope.stocklist = StockData.stockList;

  StockData.updateStockList();


  // $scope.doAThing = function(){
  //   console.log('sdjfsdiofwei');
  //   console.log('state: ', $state);
  //   $state.go('home')
  // }



});





//ADD
app.controller('addControl', function($scope, $state, StockData){
  console.log('addControl');

  console.log(StockData.stockList);

  $scope.search =  function(searchstring){
    StockData.searchStock(searchstring)
    .then(function(res){
      console.log(res.data);
      $scope.results = res.data;
    },function(err){
      console.log(err);
    });
  }


  $scope.addStock = function(result){
    StockData.addStock(result);
  }

// !!!!!!! FINISH PASSING RESULT TO ADDSTOCK
});



//-----------------------------------------------------
//SERVICE TO GET DATA FROM API AND PERSIST IT
app.service('StockData', function($http, $scope){

  this.stockList = [];

  //
  // ITERATE THROUGH THIS.STOCKLIST TO RETRIEVE QUOTES FOR LIST OF STOCKLIST
  this.updateStockList = function(){


    //$http.get('kdfjlskdflsf');
  }


//-----------------------------------------------------
// ADD 1) SEARCH FOR STOCK, ADD RESULTS TO THIS.SEARCHRESULTS SO THAT CONTROLLER CAN RETURN/DISPLAY LIST OF STOCKS
  this.searchStock = function(searchQuery){
    return $http.jsonp(`http://dev.markitondemand.com/MODApis/Api/v2/Lookup/jsonp?input=${searchQuery}&jsoncallback=JSON_CALLBACK`);
  }


//-----------------------------------------------------
  // ADD 2) CLICK ON A RESULT TO ADD THAT STOCK TO LIST
  this.addStock = function(result){

    console.log(result);
    console.log(stockList.indexOf(result));

    if(stockList.indexOf(result) !== -1){
      console.log('ITEM ALREADY EXIST!');
    }
    else{
    stockList.push(result);
      console.log('ITEM ADDED TO LIST!');
    }

    console.log('stocklist: ', stockList);

  }



});
