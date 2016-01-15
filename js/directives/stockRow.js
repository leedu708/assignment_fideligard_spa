fideligard.directive('stockRow', function() {
  return {
    templateUrl: 'js/directives/stockRow.html',
    restrict: 'A',
    scope: {
      stock: '='
    }
  };
});