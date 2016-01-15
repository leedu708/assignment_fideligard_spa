fideligard.controller('StocksCtrl',
  ['$scope', 'dateService', 'stockManager',
  function($scope, dateService, stockManager) {

    stockManager.init( dateService.getMinMaxDateText(-40, 0) ) ;

    $scope.setDate = function(newDate) {
      $scope.currentDate = newDate;
      $scope.stocks = stockManager.getByDate($scope.currentDate);
    };

    $scope.date = dateService;
    $scope.$watch('date.currentDate', $scope.setDate);

  }]);