var app = angular.module('tradeApp', []);
app.controller('tradeController', ['$scope', '$http', '$timeout', 'tradeService', function(scope, http, timeout, tradeService) {
    var self = this;
    scope.button = "make trade";
    self.submit = function() {
        var tradeServiceResponse = http.post('http://localhost:10001/trade', {
            maxMonthlyInvestment: self.maxMonthlyInvestment,
            price: self.price,
            ticker: self.ticker
        });
        //TODO clean up! lose magic strings!!
        tradeServiceResponse.then(function(response) {
            tradeService.executeTrade(response, scope);
        });
    };
}]);