fideligard.controller('DatePickerCtrl',
  ['$scope', '$filter',
  function($scope, $filter) {

    // dates in milliseconds
    $scope.startDate = Number(new Date('01/01/2014'));
    $scope.endDate = Number(new Date('12/31/2014'));
    $scope.step = 1000 * 60 * 60 * 24;
    $scope.currentDate = $scope.startDate;
    $scope.currentDateText = $filter('date')($scope.currentDate, "M/d/yyyy")
    $scope.rangePercent = 0;
    $scope.dateInput = false;

    $scope.updateLabel = function() {
      $scope.currentDateText = $filter('date')($scope.currentDate, "M/d/yyyy");
      var label = angular.element(document.querySelector('.datepicker-label'));
      $scope.rangePercent = ($scope.currentDate - $scope.startDate) / ($scope.endDate - $scope.startDate);
      label.css('margin-left', $scope.rangePercent * 100 + '%');
    };

    $scope.inputDate = function() {
      $scope.dateInput = true;
      var inputField = angular.element(document.querySelector('#datepicker-input'));
      inputField.css('left', $scope.rangePercent * 100 + '%').css('top', 0)
    };

  }]);