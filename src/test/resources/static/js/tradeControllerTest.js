describe('tradeController', function() {

    var scope, controllerService, httpMock;

    beforeEach(module('tradeApp'));
    beforeEach(module('tradeServiceApp'));

    beforeEach(inject(function($rootScope, $controller, $httpBackend) {
        scope = $rootScope.$new();
        controllerService = $controller;
        httpMock = $httpBackend;
    }));

    afterEach(function() {
        httpMock.verifyNoOutstandingExpectation();
        httpMock.verifyNoOutstandingRequest();
    });

    it("controller should post data to trade-service back-end", function() {
        // given
        var underTest = controllerService('tradeController', { $scope: scope});
        expect(underTest).toBeDefined();
        underTest.maxMonthlyInvestment = 100;
        underTest.price = 10;
        underTest.ticker = "cheese";

        // when
        underTest.submit();

        //then
        httpMock.expect('POST', 'http://localhost:10001/trade', {
            "maxMonthlyInvestment": underTest.maxMonthlyInvestment,
            "price":  underTest.price ,
            "ticker": underTest.ticker
        }).respond(201);
        httpMock.expect('POST', 'http://localhost:10000/portfolio').respond({});;
        httpMock.flush();
    });

});