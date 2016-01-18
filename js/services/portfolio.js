fideligard.factory('portfolio',
  ['transactions',
  function(transactions) {

    var portfolio = {};

    portfolio.all = {'AAPL': 8};
    portfolio.funds = 5000;
    portfolio.assests = { 'FUNDS': { shares: 5000 } };

    portfolio.currentShares = function(symbol) {
      return portfolio.all[symbol] || 0;
    };

    portfolio.reset = function() {
      console.log('reset portfolio');
      portfolio.assets = { 'FUNDS' : { shares: 5000 } };
    };

    portfolio.add = function(transaction) {
      var symbol = transaction.symbol;
      var quantityChange = transaction.quantity;
      if (transaction.type === 'SELL') {
        quantityChange *= -1;
      };

      var currentQuantity = portfolio.all[symbol] || 0;

      var newQuantity = currentQuantity += quantityChange;
      portfolio.all[symbol] = newQuantity;
    };

    portfolio.buildUp = function(futureDate, pastDate) {
      portfolio.reset();
      var dayInMill = 1000 * 60 * 60 * 24;
      var transactionsInRange = transactions.between(pastDate + dayInMill, futureDate);

      transactionsInRange.forEach( function(transaction) {
        var cashFlow = transaction.price * transaction.quantity;
        portfolio.assets[transaction.symbol] = portfolio.assets[transaction.symbol] || { shares: 0, cashInvested: 0, cashProceeds: 0 };

        if (transaction.type === 'BUY') {
          portfolio.assets['FUNDS'].shares -= cashFlow;
          portfolio.assets[transaction.symbol].shares += transaction.quantity
          portfolio.assets[transaction.symbol].cashInvested += cashFlow;
        } else {
          portfolio.assets['FUNDS'].quantity += cashFlow;
          portfolio.assets[transaction.symbol].shares -= transaction.quantity
          portfolio.assets[transaction.symbol].costProceeds -= cashFlow;
        };
      });
    };

    portfolio.present = function() {
      output = [];
      for (var symbol in portfolio.assets) {
        output.push( portfolio.generate(symbol, portfolio.assets[symbol]) );
      }
      return output;
    };

    portfolio.generate = function(symbol, data) {
      return {
        symbol: symbol,
        quantity: data.shares,
        costBasis: data.cashInvested - data.cashProceeds,
        currentValue: function() { return this.quantity * this.currentPrice },
        profit: function() { return this.currentValue() - this.costBasis },
        currentPrice: 1,
        priceChange1D: null,
        priceChange7D: null,
        priceChange30D: null
      };
    };

    // portfolio.buildDown = function(futureDate, pastDate) {
    //   var dayInMill = 1000 * 60 * 60 * 24;
    //   var transactionsInRange = transactions.between(pastDate, futureDate - dayInMill);

    //   transactionsInRange.forEach( function(transaction) {
    //     var cashFlow = transaction.price * transaction.quantity;
    //     if (transaction.type === 'SELL') {
    //       portfolio.assets['FUNDS'].quantity -= cashFlow;
    //       portfolio.assets[transaction.symbol].shares += transaction.quantity
    //       portfolio.assets[transaction.symbol].costBasis += cashFlow;
    //     } else {
    //       portfolio.assets['FUNDS'].quantity += cashFlow;
    //       portfolio.assets[transaction.symbol].shares -= transaction.quantity
    //       portfolio.assets[transaction.symbol].costBasis -= cashFlow;
    //     };
    //   });
    // };

    return portfolio;

  }]);