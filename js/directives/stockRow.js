fideligard.directive('stockRow', function() {
  return {
    templateUrl: 'js/directives/views/stockRow.html',
    restrict: 'A',
    scope: {
      stock: '='
    }
  };
});