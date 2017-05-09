describe('plotlyChartDirective', function() {

    var scope, compile, httpMock;

    beforeEach(module('plotlyChartApp'));
    beforeEach(module('portfolioApp'));
    beforeEach(inject(function($compile, $rootScope, $httpBackend) {
        compile = $compile
        scope = $rootScope.$new();
        httpMock = $httpBackend;
        spyOn(Plotly, 'newPlot');
        spyOn(Plotly, 'relayout');
    }));

    it("should call view when directive tag is used", function() {
        // given
        scope.dataHasLoaded = true;
        scope.portfolio = [{"dateTime": "2017-01-27T07:09:51.863", "accountValue": 1000 }];
        httpMock.expectGET('views/plotly-chart.html').respond('<div id="plotly" ></div>');
        httpMock.expectGET('http://localhost:10000/portfolio').respond("some portfolio response");

        // when
        compile('<div><plotly-chart-directive ng-if="dataHasLoaded" ctrl="portfolioController"/></div>')(scope);

        // then
        scope.$digest();
        httpMock.flush();
        httpMock.verifyNoOutstandingExpectation();
        httpMock.verifyNoOutstandingRequest();
    });

});