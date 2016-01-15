fideligard.controller('TradeCtrl',
  ['$scope', 'dateService', 'funds', 'portfolio', 'stockManager', 'transactions',
  function($scope, dateService, funds, portfolio, stockManager, transactions) {

    $scope.init = function() {
    $scope.funds = funds.availableFunds;

      $scope.transaction = {
        symbol: 'AAPL',
        type: 'BUY',
        quantity: 1,
        date: new Date(dateService.currentDate),
        price: null
      };

      $scope.currentShares = portfolio.currentShares($scope.transaction.symbol);
      $scope.calcMaxQuantity();

      $scope.status = function(valid) {
        if (valid) {
          return "VALID"
        } else {
          return "INVALID"
        };
      };

      $scope.refresh = function() {
        $scope.transaction.price = stockManager.getPrice($scope.transaction.symbol, $scope.transaction.date);
        $scope.currentShares = portfolio.currentShares($scope.transaction.symbol);
        $scope.calcMaxQuantity();
      };

      // watches for change in stock data and adjusts price accordingly
      $scope.manager = stockManager;
      $scope.$watch('manager.stockData', function(newData) {
        $scope.transaction.price = stockManager.getPrice($scope.transaction.symbol, $scope.transaction.date);
      }, true);

    };

    $scope.calcMaxQuantity = function() {
      if ($scope.transaction.type === 'BUY') {
        $scope.maxQuantity = $scope.calcMaxBuyQuantity();
      } else {
        $scope.maxQuantity = $scope.currentShares;
      };

      angular.element(document.querySelector('.number-inpu')).attr('max', $scope.maxQuantity);
    };

    $scope.calcMaxBuyQuantity = function() {
      if ($scope.transaction.price) {
        return Math.floor($scope.funds / $scope.transaction.price);
      } else {
        return 1
      };
    };

    $scope.processOrder = function(valid) {
      transactions.create($scope.transaction);
      funds.payment($scope.transaction);
      portfolio.add($scope.transaction)

      $scope.funds = funds.availableFunds;
      $scope.currentShares = portfolio.currentShares($scope.transaction.symbol);
      $scope.calcMaxQuantity();
    };

    $scope.init();

  }]);