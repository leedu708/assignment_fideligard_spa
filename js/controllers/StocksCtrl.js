fideligard.controller('StocksCtrl',
  ['$scope', 'dateService', 'stockManager',
  function($scope, dateService, stockManager) {

    stockManager.init( dateService.getMinMaxDateText(-40, 0) ) ;

    $scope.sortBy = "symbol";
    $scope.sortDescending = false;

    $scope.setDate = function(newDate) {
      $scope.currentDate = newDate;
      $scope.stocks = stockManager.getByDate($scope.currentDate);
    };

    $scope.date = dateService;
    $scope.$watch('date.currentDate', $scope.setDate);

    $scope.refreshStocks = function(refresh) {
      if (refresh) {
        $scope.stocks = stockManager.getByDate($scope.currentDate);
        stockManager.resetRefresh();
      };
    };

    $scope.manager = stockManager;
    $scope.$watch('manager.refresh', $scope.refreshStocks);

    $scope.toggleSort = function(column) {
      if (column === $scope.sort) {
        $scope.sortDescending ^= true;
      } else {
        $scope.sort = column;
        if (column === 'symbol') {
          $scope.sortDescending = false;
        } else {
          // always sort descending for dollar values
          $scope.sortDescending = true;
        };
      };
    };

    $scope.getIcon = function(column) {
      if ($scope.sort === column) {
        return $scope.sortDescending
          ? 'glyphicon-chevron-up'
          : 'glyphicon-chevron-down';
      };
    };

  }]);