fideligard.controller('DatePickerCtrl',
  ['$scope', '$filter', 'dateService',
  function($scope, $filter, dateService) {

    // dates in milliseconds
    $scope.startDate = dateService.startDate;
    $scope.endDate = dateService.endDate;
    $scope.step = dateService.step;
    $scope.currentDate = dateService.currentDate;

    $scope.setCurrentDateText = function() {
      $scope.currentDateText = $filter('date')($scope.currentDate, "M/d/yyyy");
    };

    $scope.updateDate = function() {
      dateService.setCurrentDate($scope.currentDate);
      $scope.updateLabel();
    };

    // updates datepicker input above selector
    $scope.updateLabel = function() {
      $scope.setCurrentDateText();
      var label = angular.element(document.querySelector('.datepicker-label'));
      var range = ($scope.currentDate - $scope.startDate) / ($scope.endDate - $scope.startDate);
      label.css('margin-left', range * 100 + '%');
    };

    $scope.unfocus = function() {
      document.dateTextForm.dateText.blur();
    };

    $scope.updateDateText = function() {
      var input = new Date(document.dateTextForm.dateText.value);

      if (input > $scope.startDate && input < $scope.endDate) {
        $scope.currentDate = Number(new Date(input));
        $scope.updateDate();
      } else {
        console.log('input out of range');
        $scope.setCurrentDateText();
      };
    };

    ($scope.init = function() {
      $scope.setCurrentDateText();
    })();

  }]);