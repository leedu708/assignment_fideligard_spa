fideligard.factory('funds',
  function() {

    var funds = {};

    funds.availableFunds = 10000;

    funds.payment = function(transaction) {
      var transactChange = transaction.price * transaction.quantity;

      if (transaction.type === 'BUY') {
        transactChange *= -1;
      };

      funds.availableFunds += transactChange;
    };

    return funds;

  });