fideligard.directive('portfolioRow', function() {
  return {
    templateUrl: 'js/directives/portfolioRow.html',
    restrict: 'A',
    scope: {
      stock: '='
    }
  };
});