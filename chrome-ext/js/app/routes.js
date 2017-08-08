EatMyCookiesApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      // Default
      when('/default', {
        templateUrl: '../partials/options.html',
        controller: 'OptionsCtrl'
      }).

      // Autres
      otherwise({
        redirectTo: '/default'
      });
  }]);