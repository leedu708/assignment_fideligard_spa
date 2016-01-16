fideligard.directive('transactionRow', function() {
  return {
    templateUrl: 'js/directives/views/transactionRow.html',
    restrict: 'A',
    scope: {
      transaction: '='
    }
  };
});