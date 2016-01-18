fideligard.directive('portfolioRow', function() {
  return {
    templateUrl: 'js/directives/views/portfolioRow.html',
    restrict: 'A',
    scope: {
      stock: '='
    }
  };
});