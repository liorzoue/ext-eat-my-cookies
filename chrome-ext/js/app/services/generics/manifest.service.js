EatMyCookiesApp.factory('Manifest', ['$http', function($http){
	var _instance;
    var _expireAt;
    
    var _result = null;
    
    function _addMinutes(date, minutes) { return new Date(date.getTime() + minutes*60000); }
    
    function _hasExpired() {
        if (_expireAt == null) return true;
        if (_expireAt < new Date()) return true;
        return false;
    }
    
    
	var _httpGetManifest = function () {
		$http.get("/manifest.json").then(function (data) {
			return data;
		});
	};
    
	var _getManifest = function () {
		if (!chrome) return _httpGetManifest();
		if (!chrome.runtime) return _httpGetManifest();
        
		return chrome.runtime.getManifest();
	};
    
    function Manifest() {
        return _getManifest();
    }
    
    return {
        getInstance: function () {
            if (_hasExpired()) {
                _instance = new Manifest();
                
                // 30 minutes
                _expireAt = _addMinutes(new Date(), 30);
            }
            return _instance;
        }
    }
    
    
	return {
		get: function () {
			return getManifest();
		}
	};
}]);