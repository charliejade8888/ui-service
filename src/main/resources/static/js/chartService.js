var app = angular.module('chartServiceApp', []).factory('chartService', [function() {
    return {
        drawChart: function(chartData) {
            var chartElementReady = document.getElementById('plotly');
            if (chartElementReady) {
                Plotly.newPlot('plotly', chartData);
                Plotly.relayout('plotly', {
                    'xaxis.autorange': true,
                    'yaxis.autorange': true
                });
            }
        },
        generateChartData: function(data) {
            var x = [];
            var y = [];
            for (var i = 0; i < data.length; i++) {
                var object = data[i].entity;
                for (var attribute in object) {
                    if (attribute == 'dateTime') {
                        x.push(object[attribute]);
                    };
                    if (attribute == 'accountValue') {
                        y.push(object[attribute])
                    };
                }
            };
            return [{
                x: x,
                y: y,
                type: 'bar'
            }];
        }
    };
}]);