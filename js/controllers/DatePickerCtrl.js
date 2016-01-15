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

    // runs immediately
    ($scope.setCurrentDateText = function() {
      $scope.currentDateText = $filter('date')($scope.currentDate, "M/d/yyyy");
    })();

    // updates datepicker input above selector
    $scope.updateLabel = function() {
      $scope.setCurrentDateText();
      var label = angular.element(document.querySelector('.datepicker-label'));
      $scope.range = ($scope.currentDate - $scope.startDate) / ($scope.endDate - $scope.startDate);
      label.css('margin-left', $scope.range * 100 + '%');
    };

    $scope.unfocus = function() {
      document.dateTextForm.dateText.blur();
    };

    $scope.updateDateText = function() {
      var input = new Date(document.dateTextForm.dateText.value);

      if (input > $scope.startDate && input < $scope.endDate) {
        $scope.currentDate = Number(new Date(input));
        $scope.updateLabel();
      } else {
        console.log('input out of range');
        $scope.currentDateText();
      };
    };

  }]);