fideligard.controller('MainCtrl',
  ['$scope', 'dateService', 'portfolio', 'stockManager',
  function($scope, dateService, portfolio, stockManager) {

    $scope.init = function() {
      stockManager.init(dateService.getMinMaxDateText(-40, 0));
    };

    $scope.init();

  }]);