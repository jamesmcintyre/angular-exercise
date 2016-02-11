'user strict';




//LIST SHIT
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
