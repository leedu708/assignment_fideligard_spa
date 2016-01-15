fideligard.factory('dateService', function() {

  var dateService = {};

  dateService.startDate = Number(new Date('01/02/2014'));
  dateService.endDate = Number(new Date('12/31/2014'));
  dateService.step = 1000 * 60 * 60 * 24;
  dateService.currentDate = dateService.startDate;

  dateService.getMinMaxDates = function(adjustment1, adjustment2) {
    msAdj1 = adjustment1 * this.step;
    msAdj2 = adjustment2 * this.step;
    return [this.startDate + msAdj1, this.endDate + msAdj2];
  };

  dateService.getMinMaxDateText = function(adjustment1, adjustment2) {
    return this.getMinMaxDates(adjustment1, adjustment2).
      map( function(dateNumber) {
        return dateService.numberToString(dateNumber);
      });
  };

  dateService.numberToString = function(number) {
    var dateObj = new Date(number);
    var year = (dateObj.getYear() + 1900).toString();
    var month = this.twoDigitString( dateObj.getMonth() + 1);
    var day = this.twoDigitString( dateObj.getDate() );
    return year + "-" + month + "-" + day;
  };

  dateService.twoDigitString = function(number) {
    if (number < 10) {
      return "0" + number.toString();
    } else {
      return number.toString();
    };
  };

  dateService.setCurrentDate = function(date) {
    dateService.currentDate = date;
  };

  dateService.getCurrentDate = function() {
    return dateService.currentDate;
  };

  return dateService;

});