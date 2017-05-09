describe('chartService', function() {

    var chartService;

    beforeEach(module('chartServiceApp'));
    beforeEach(inject(function(_chartService_) {
        chartService = _chartService_;
        spyOn(Plotly, 'newPlot');
        spyOn(Plotly, 'relayout');
        spyOn(document, 'getElementById').and.returnValue("I exist!!");
    }));

    it("sanity check", function() {
        expect(chartService).toBeDefined();
    });

    it("should convert grid data into chart data", function() {
        // given
        var row = [];
        var data = {
            "dateTime": "someDate",
            "accountValue": "123"
        };
        row.push({
            "entity": data
        });
        // and
        var expected = {
            "x": ["someDate"],
            "y": ["123"],
            "type": 'bar'
        };
        // when
        var actual = chartService.generateChartData(row)[0];

        //then
        expect(expected).toEqual(actual);
    });

    it("should draw the chart", function() {
        // given
        var data = {"my wonderful key": "my wonderful value"};

        // when
        chartService.drawChart(chartService.generateChartData(data));

        //then
        expect(Plotly.newPlot).toHaveBeenCalled();
        expect(Plotly.relayout).toHaveBeenCalled();
    });

});