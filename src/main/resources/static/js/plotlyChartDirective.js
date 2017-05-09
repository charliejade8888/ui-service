angular.module('plotlyChartApp', []).directive('plotlyChartDirective', [function() {
    return {
        templateUrl: 'views/plotly-chart.html',
        name: 'ctrl',
        controller: '@',
        controllerAs: 'chart',
        bindToController: true,
        link: function(scope, element, attrs) {
        }
    };
}]);