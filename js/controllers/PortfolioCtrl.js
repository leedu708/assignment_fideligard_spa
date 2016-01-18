fideligard.controller('PortfolioCtrl',
  ['$scope', '$state', 'portfolio', 'dateService', 'stockManager', 'stockCalculator',
  function($scope, $state, portfolio, dateService, stockManager, stockCalculator) {

    $scope.init = function() {
      $scope.selectedState = $state.current.name;

      $scope.sort = 'date';
      $scope.sortDescending = false;

      $scope.getData();

      $scope.date = dateService;
      $scope.$watch('date.currentDate', $scope.setDate);

      $scope.manager = stockManager;
      $scope.$watch('manager.stocksLoaded', $scope.getData);
    };

    $scope.setDate = function(newDate, oldDate) {
      $scope.currentDate = newDate;
      portfolio.buildUp(newDate, 0);
      $scope.getData();
    };

    $scope.getData = function() {
      if (stockManager.stocksLoaded) {
        $scope.portfolio = portfolio.present();
        $scope.portfolio.forEach( function(stock) {
          if (stock.symbol !== 'FUNDS') {
            var priceInfo = stockCalculator.generate(stockManager.stockData[stock.symbol], $scope.currentDate);
            stock.currentPrice = priceInfo.price;
            stock.priceChange1D = priceInfo.priceChange1D;
            stock.priceChange7D = priceInfo.priceChange7D;
            stock.priceChange30D = priceInfo.priceChange30D;
          };
        });
      };
    };

    $scope.toggleSort = function(column) {
      if (column === $scope.sort) {
        $scope.sortDescending ^= true;
      } else {
        $scope.sort = column;
        if (column === 'symbol') {
          $scope.sortDescending = false;
        } else {
          $scope.sortDescending = true;
        }
      };
    };

    $scope.getIcon = function(column) {
      if ($scope.sort === column) {
        return $scope.sortDescending
        ? 'glyphicon-chevron-up'
        : 'glyphicon-chevron-down';
      };
    };

    $scope.routeTo = function(state) {
      $state.go(state);
    };

    $scope.init();

  }]);