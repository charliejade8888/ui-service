angular.module('angularUiGridApp', ['ui.grid', 'ui.grid.grouping']).directive('angularUiGridDirective', ['chartService', function(chartService) {
    return {
        //this.name = 'portfolioController';
        templateUrl: 'views/angular-ui-grid.html',
        name: 'ctrl',
        controller: '@',
        controllerAs: 'grid',
        //restrict: 'A',
        bindToController: true,
        link: function(scope, element, attrs) {
            scope.grid.gridOptions.enableGridMenu = true;
            scope.grid.gridOptions.treeRowHeaderAlwaysVisible = false;
            scope.grid.gridOptions.enableFiltering = true;
            scope.grid.gridOptions.enableHorizontalScrollbar = 2;
            scope.grid.gridOptions.enableVerticalScrollbar = 2;
            scope.grid.gridOptions.onRegisterApi = function(gridApi) {
                scope.grid.gridApi = gridApi;
                gridApi.core.on.rowsRendered(scope, function() {
                    var visibleRows = gridApi.core.getVisibleRows();
                    chartService.drawChart(chartService.generateChartData(visibleRows));
                });
            };
            scope.grid.gridOptions.columnDefs = [{
                name: 'dateTime',
                displayName: 'date',
                width: 150
            }, {
                name: 'maxMonthlyInvestment',
                displayName: 'max investment',
                width: 150
            }, {
                name: 'ticker',
                displayName: 'ticker',
                width: 80
            }, {
                name: 'numOfSharesToBuy',
                displayName: '# of shares to buy',
                width: 150
            }, {
                name: 'numOfSharesHeld',
                displayName: '# of shares held',
                width: 150
            }, {
                name: 'sharesHeldValue',
                displayName: 'shares held',
                width: 130
            }, {
                name: 'cashHeldValue',
                displayName: 'cash held',
                width: 100
            }, {
                name: 'accountValue',
                displayName: 'account value',
                width: 130
            }, {
                name: 'price',
                displayName: 'price ',
                width: 80
            }, {
                name: 'buyAdvice',
                displayName: 'buy advice',
                width: 130
            }, ]
        }
    };
}]);