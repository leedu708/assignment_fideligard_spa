fideligard.controller('TransactionsCtrl',
  ['$scope', '$state', 'transactions',
  function($scope, $state, transactions) {

    $scope.init = function() {
      $scope.selectedState = $state.current.name;

      $scope.sort = "date";
      $scope.sortDescending = false;

      $scope.transactions = transactions.all;
      console.log($scope.transactions);
    }

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