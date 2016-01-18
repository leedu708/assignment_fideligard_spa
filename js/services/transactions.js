fideligard.factory('transactions',
  function() {

    var transactions = {};

    transactions.all = [{"symbol":"EBAY","type":"BUY","quantity":7,"date":new Date("2014-01-02T05:00:00.000Z"),"price":53.939995,"$$hashKey":"object:252"},{"symbol":"FOX","type":"BUY","quantity":4,"date":new Date("2014-01-02T05:00:00.000Z"),"price":35.040001,"$$hashKey":"object:263"},{"symbol":"LULU","type":"BUY","quantity":10,"date":new Date("2014-01-10T05:00:00.000Z"),"price":59.599998,"$$hashKey":"object:565"},{"symbol":"BOOM","type":"BUY","quantity":12,"date":new Date("2014-01-18T05:00:00.000Z"),"price":22.09,"$$hashKey":"object:832"},{"symbol":"EMC","type":"BUY","quantity":23,"date":new Date("2014-03-25T05:00:00.000Z"),"price":28.18,"$$hashKey":"object:1677"},{"symbol":"LULU","type":"SELL","quantity":10,"date":new Date("2014-05-21T05:00:00.000Z"),"price":44.790001,"$$hashKey":"object:2344"},{"symbol":"YUM","type":"BUY","quantity":8,"date":new Date("2014-05-21T05:00:00.000Z"),"price":74.669998,"$$hashKey":"object:2365"},{"symbol":"EBAY","type":"SELL","quantity":7,"date":new Date("2014-07-23T05:00:00.000Z"),"price":52.659998,"$$hashKey":"object:3000"},{"symbol":"SAM","type":"BUY","quantity":5,"date":new Date("2014-07-23T05:00:00.000Z"),"price":222.070007,"$$hashKey":"object:3025"},{"symbol":"EMC","type":"SELL","quantity":23,"date":new Date("2014-08-03T05:00:00.000Z"),"price":29.059999,"$$hashKey":"object:3376"},{"symbol":"AAPL","type":"BUY","quantity":7,"date":new Date("2014-08-03T05:00:00.000Z"),"price":96.129997,"$$hashKey":"object:3405"},{"symbol":"BUD","type":"BUY","quantity":14,"date":new Date("2014-09-15T05:00:00.000Z"),"price":114.449997,"$$hashKey":"object:4517"},{"symbol":"AAPL","type":"SELL","quantity":15,"date":new Date("2014-10-24T05:00:00.000Z"),"price":105.220001,"$$hashKey":"object:5594"},{"symbol":"GE","type":"BUY","quantity":21,"date":new Date("2014-10-24T05:00:00.000Z"),"price":25.639999,"$$hashKey":"object:5629"},{"symbol":"FOX","type":"SELL","quantity":4,"date":new Date("2014-12-05T05:00:00.000Z"),"price":36.52,"$$hashKey":"object:6531"}]

    transactions.create = function(transaction) {
      transactions.all.push(transaction);
    };

    transactions.between = function(startDate, endDate) {
      return transactions.all.filter( function(transaction) {
        return (transaction.date >= startDate && transaction.date <= endDate)
      });
    };

    return transactions;

  });