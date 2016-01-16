fideligard.factory('portfolio',
  ['transactions',
  function(transactions) {

    var portfolio = {};

    portfolio.all = {'AAPL': 8};
    portfolio.funds = 5000;
    portfolio.assests = { 'FUNDS': { quantity: 5000 } };

    portfolio.currentShares = function(symbol) {
      return portfolio.all[symbol] || 0;
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
      var dayInMill = 1000 * 60 * 60 * 24;
      var transactionsInRange = transactions.between(pastDate + dayInMill, futureDate);

      transactionsInRange.forEach( function(transaction) {
        var cashFlow = transaction.price * transaction.quantity;
        if (transaction.type === 'BUY') {
          portfolio.assets['FUNDS'].quantity -= cashFlow;
          portfolio.assets[transaction.symbol].shares += transaction.quantity
          portfolio.assets[transaction.symbol].costBasis += cashFlow;
        } else {
          portfolio.assets['FUNDS'].quantity += cashFlow;
          portfolio.assets[transaction.symbol].shares -= transaction.quantity
          portfolio.assets[transaction.symbol].costBasis -= cashFlow;
        };
      });
    };

    portfolio.buildDown = function(futureDate, pastDate) {
      var dayInMill = 1000 * 60 * 60 * 24;
      var transactionsInRange = transactions.between(pastDate, futureDate - dayInMill);

      transactionsInRange.forEach( function(transaction) {
        var cashFlow = transaction.price * transaction.quantity;
        if (transaction.type === 'SELL') {
          portfolio.assets['FUNDS'].quantity -= cashFlow;
          portfolio.assets[transaction.symbol].shares += transaction.quantity
          portfolio.assets[transaction.symbol].costBasis += cashFlow;
        } else {
          portfolio.assets['FUNDS'].quantity += cashFlow;
          portfolio.assets[transaction.symbol].shares -= transaction.quantity
          portfolio.assets[transaction.symbol].costBasis -= cashFlow;
        };
      });
    };

    return portfolio;

  }]);