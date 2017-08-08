var EatMyCookiesControllers = angular.module('EatMyCookiesControllers', ['ngResource', 'ngRoute', 'LocalStorageModule']);
var EatMyCookiesApp = angular.module('EatMyCookiesApp', ['EatMyCookiesControllers']);

EatMyCookiesApp
	.config(function ($compileProvider, localStorageServiceProvider) {
        
	  	localStorageServiceProvider
	  		.setPrefix('EatMyCookiesApp')
	  		.setNotify(true, true);

        // */
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|local|data|chrome-extension):/);
});