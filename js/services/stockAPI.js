fideligard.factory('stockAPI',
  ['$http',
  function($http) {

    var stockAPI = {};

    stockAPI.getStock = function(symbol, startDate, endDate) {
      return $http({
        method: 'GET',
        url: this.urlFor(symbol, startDate, endDate)
      });
    };

    stockAPI.urlFor = function(symbol, startDate, endDate) {
      var base = "http://query.yahooapis.com/v1/public/yql?q= select * from yahoo.finance.historicaldata where symbol = '"
      var addQuery1 = "' and startDate = '";
      var addQuery2 = "' and endDate = '";
      var closeQuery = "' &format=json &diagnostics = true &env=store://datatables.org/alltableswithkeys &callback=";
      return base + symbol + addQuery1 + startDate + addQuery2 + endDate + closeQuery;
    };

    return stockAPI;

  }]);