EatMyCookiesApp.controller('OptionsCtrl', ['$scope', 'Manifest', 'EatStorage', function ($scope, Manifest, Storage) {
	$scope.Options = Storage.load();
	$scope.Manifest = Manifest.getInstance();

	$scope.toggle = function (what) {
		$scope.Options[what] = !$scope.Options[what];
		$scope.Options = Storage.save($scope.Options);
	}

	$scope.openUrl = function (newURL) {
		var utm = "utm_source=ext_eat&utm_medium=ext_settings&utm_campaign=link";
		chrome.tabs.create({ url: newURL + "?" + utm });
	};
}]);