fideligard.controller('TransactionsCtrl',
  ['$scope', '$state',
  function($scope, $state) {

    $scope.init = function() {
      $scope.selectedState = $state.current.name;

      $scope.sort = "date";
      $scope.sortDescending = false;

      $scope.transactions = transactions.all;
      console.log($scope.transactions);
    }

    $scope.selectedState = $state.current.name;

    $scope.routeTo = function(state) {
      $state.go(state);
    };

  }]);