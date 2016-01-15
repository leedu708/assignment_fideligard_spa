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

    stockManager.stockData = [];
    stockManager.refresh = false;

    stockManager.init = function(datesMinMax) {
      this.stockList.forEach( function(symbol) {
        stockAPI.getStock(symbol, datesMinMax[0], datesMinMax[1]).
          then( stockManager.saveData, stockManager.logError )
      });
    };

    stockManager.saveData = function(response) {
      stockManager.stockData.push(response.data.query.results.quote);
      console.log('Loaded', + stockManager.stockData.length + ' of ' + stockManager.stockList.length);
      stockManager.refresh = true;
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
      return this.stockData.map( function(record) {
        return stockCalculator.generate(record, date);
      });
    };

    return stockManager;

  }]);