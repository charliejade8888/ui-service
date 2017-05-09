//var app = angular.module('portfolioApp', ['ui.grid']);
angular.module('portfolioApp', ['ui.grid', 'ui.grid.grouping']).controller('portfolioController', ['$scope', '$filter', '$http', 'uiGridGroupingConstants', function(scope, filter, http, uiGridGroupingConstants) {
    var grid = this;
    scope.dataHasLoaded = false;
    http.get('http://localhost:10000/portfolio').then(function(response) {
        scope.portfolio = response.data;
        grid.gridOptions.data = response.data;
        if (response.data.length > 0) {
           scope.dataHasLoaded = true;
        }
    });
    grid.gridOptions = {
        //overrides here (if missing from directive)
    };
}]);