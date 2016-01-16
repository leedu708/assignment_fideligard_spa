fideligard.factory('stockCalculator', function() {

  var stockCalculator = {};

  // query.results.quote[i] is one day
  // stockCalculator.dailyResults = stockCalculator.JSON.query.results.quote;

  stockCalculator.dataRecord = {};

  stockCalculator.datesInRange = function(data, lastDate, numberOfDays) {
    var firstDate = lastDate - (numberOfDays * 1000 * 60 * 60 * 24);
    var filtered = data.filter(function(record) {
      var recordDate = Date.parse(record.Date);
      return (recordDate < lastDate && recordDate > firstDate);
    });
    var sorted = filtered.sort( stockCalculator.relativeDay );
    return(sorted);
  };

// always make data array of 31 days, starting with undefineds
// then clean up, setting dates for undefineds and adding price from earlier day
  stockCalculator.buildArray = function(dataRecord, date, range) {
    var filtered = this.datesInRange(dataRecord, date, range);
    var cleansed = []
    filtered.forEach( function(record) {
      var day = stockCalculator.relativeDay(record, date)
      cleansed[day] = record;
    });
    return stockCalculator.fillArray(cleansed);
  };

  stockCalculator.fillArray = function(array) {
    var filled = [];

    // reverse fill prices on weekends/holidays
    for(var i = array.length - 1; i >= 0; i--) {
      if (array[i] === undefined) {
        filled[i] = filled[i + 1];
      } else {
        filled[i] = array[i];
      };
    };
    return filled;
  };

  stockCalculator.relativeDay = function(stockRecord, baseDate) {
    var year = Number(stockRecord.Date.slice(0,4));
    //month is the only zero-indexed input
    var month = Number(stockRecord.Date.slice(5,7)) - 1;
    var day = Number(stockRecord.Date.slice(8,10));
    var stockDate = new Date(year, month, day);

    // rounding for now, consider using Date.js for cleaner handling later
    // ...because Daylight Savings is a pain
    return Math.round((baseDate - stockDate) / (1000*60*60*24));
  };

  stockCalculator.getStocks = function(date) {
    var array = stockCalculator.buildArray(date, 40);
    return {
      symbol: array[0].Symbol,
      price: array[0].Close,
      priceChange1D: this.priceChange(array, 1),
      priceChange7D: this.priceChange(array, 7),
      priceChange30D: this.priceChange(array, 30)
    };
  };

  stockCalculator.generate = function(dataRecord, date) {
    var array = stockCalculator.buildArray(dataRecord, date, 40);
    return {
      symbol: array[0].Symbol,
      price: Number(array[0].Close),
      priceChange1D: this.priceChange(array, 1),
      priceChange7D: this.priceChange(array, 7),
      priceChange30D: this.priceChange(array, 30)
    };
  };

  stockCalculator.priceChange = function(array, range) {
    if (array.length > range) {
      return array[0].Close - array[range].Close;
    } else {
      return null;
    };
  };

  return stockCalculator;

});