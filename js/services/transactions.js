fideligard.factory('transactions',
  function() {

    var transactions = {};

    transactions.all = [];

    transactions.create = function(transaction) {
      transactions.all.push(transaction);
    };

    return transactions;

  });