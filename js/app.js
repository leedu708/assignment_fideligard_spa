var fideligard = angular.module('fideligard', ['ui.router', 'ui.bootstrap']);

fideligard.config( function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/fideligard/shared");

  $stateProvider
  .state('fideligard', {
    url: '/fideligard',
    views: {
      '': {
        templateUrl: 'views/fideligard.html',
        controller: 'MainCtrl'
      }
    }
  })

  .state('fideligard.shared', {
    url: '/shared',
    views: {
      'datepicker': {
        templateUrl: 'views/datepicker.html',
        controller: 'DatePickerCtrl'
      },

      'stocks': {
        templateUrl: 'views/stocks.html',
        controller: function($scope) { console.log("stocks") }
      },

      'main': {
        templateUrl: 'views/main/main.html',
        controller: function($scope) { console.log("main") }
      }
    }
  })

  .state('fideligard.shared.trade', {
    url: '/trade',
    views: {
      '': {
        templateUrl: 'views/main/trade.html',
        controller: function($scope) { console.log("trade") }
      }
    }
  })

  .state('fideligard.shared.transactions', {
    url: '/transactions',
    views: {
      '': {
        templateUrl: 'views/main/transactions',
        controller: function($scope) { console.log("transactions") }
      }
    }
  })

  .state('fideligard.shared.portfolio', {
    url: '/portfolio',
    views: {
      '': {
        templateUrl: 'views/main/portfolio',
        controller: function($scope) { console.log("portfolio") }
      }
    }
  })

});

// error handling
fideligard.run(function($rootScope) {
  $rootScope.$on("$stateChangeError", console.log.bind(console));
});