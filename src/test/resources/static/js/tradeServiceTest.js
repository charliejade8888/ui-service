describe('tradeService', function() {
    var tradeService;

    beforeEach(module('tradeServiceApp'));

    beforeEach(inject(function(_tradeService_, $httpBackend) {
        tradeService = _tradeService_;
        httpMock = $httpBackend;
    }));

    afterEach(function() {
            httpMock.verifyNoOutstandingExpectation();
            httpMock.verifyNoOutstandingRequest();
    });

    it("sanity check", function() {
        expect(tradeService).toBeDefined();
    });

    it("controller should post data to trade-service back-end", function() {
        // given
        var scope = { "button" : ""};
        var response = { "status" : 201 };

        // when
        tradeService.executeTrade(response, scope);

        //then
        httpMock.expectPOST('http://localhost:10000/portfolio').respond(response);
        httpMock.flush();
    });
});