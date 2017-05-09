var app = angular.module('tradeServiceApp', []).factory('tradeService', ['$http', '$timeout', function(http, timeout) {
    return {
        executeTrade: function(response, scope) {
            if (response.status === 201) {
                http.post('http://localhost:10000/portfolio').then(function(response) {
                    scope.button = "executing trade";
                    _waitForTradeToManifestInPortfolioDB(response, scope);
                });
            }
        }
    };
    function _waitForTradeToManifestInPortfolioDB(response, scope) {
        if (response.status === 201) {
            http.get('http://localhost:10000/portfolio').then(function(response) {
                scope.$$nextSibling.grid.options.data = response.data;
                scope.$$nextSibling.grid.api.core.refresh();
            });
            timeout(function() {
                scope.button = "trade complete";
            }, 100);
            timeout(function() {
                scope.button = "make another trade";
            }, 100);
        } else {
            timeout(function() {
                scope.button = "trade failed";
            }, 100);
            timeout(function() {
                scope.button = "try again";
            }, 100);
        }
    };
}]);