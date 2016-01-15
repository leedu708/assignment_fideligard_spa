fideligard.factory('stockManager',
  ['stockAPI', 'stockCalculator',
  function(stockAPI, stockCalculator) {

    var stockManager = {};

    stockManager.stockList = [
      'AAPL',
      'BOOM',
      'FOX',
      'EMC',
      'GE',
      'EBAY',
      'YUM',
      'HAL',
      'MON',
      'BUD',
      'SAM',
      'LULU'
    ];

    stockManager.stockData = {};
    stockManager.refresh = false;
    stockManager.stocksLoaded = false;

    stockManager.init = function(datesMinMax) {
      this.stockList.forEach( function(symbol) {
        stockAPI.getStock(symbol, datesMinMax[0], datesMinMax[1]).
          then( stockManager.saveData, stockManager.logError )
      });
    };

    stockManager.saveData = function(response) {
      var data = response.data.query.results.quote;
      var symbol = data[0].Symbol;

      stockManager.stockData[symbol] = data;
      stockManager.loadingProgress();
    };

    stockManager.loadingProgress = function() {
      var numberLoaded = Object.keys(stockManager.stockData).length;
      var total = stockManager.stockList.length;
      stockManager.refresh = true;

      if (numberLoaded === total) {
        stockManager.stocksLoaded = true;
      };
    };

    stockManager.resetRefresh = function(response) {
      stockManager.refresh = false;
    };

    stockManager.logError = function(response) {
      console.log('api error');
      console.log(response);
      console.log('end api error')
    };

    stockManager.getByDate = function(date) {
      var data = this.stockData;
      var output = [];

      for (var symbol in data) {
        output.push( stockCalculator.generate(data[symbol], date) );
      };

      return output;
    };

    stockManager.getPrice = function(symbol, date) {
      var validSymbol = stockManager.stockList.indexOf(symbol) !== -1;
      if (stockManager.stocksLoaded && validSymbol) {
        return stockCalculator.generate(stockManager.stockData[symbol], date).price;
      } else {
        return null;
      };
    };

    return stockManager;

  }]);