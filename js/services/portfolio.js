fideligard.factory('portfolio',
  function() {

    var portfolio = {};

    portfolio.all = {'AAPL': 8};

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

    return portfolio;

  });