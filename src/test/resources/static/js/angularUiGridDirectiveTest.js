describe('angularUiGridDirective', function() {

    var scope, compile, httpMock;

    beforeEach(module('angularUiGridApp'));
    beforeEach(module('portfolioApp'));
    beforeEach(module('chartServiceApp'));
    beforeEach(inject(function($compile, $rootScope, $httpBackend) {
        compile = $compile
        scope = $rootScope.$new();
        httpMock = $httpBackend;
    }));

    it("should call view when directive tag is used", function() {
        // given
        httpMock.expectGET('views/angular-ui-grid.html').respond('<table ui-grid="grid.gridOptions" class="my-grid" ui-grid-grouping class="grid"></table>');
        httpMock.expectGET('http://localhost:10000/portfolio').respond('[{"ticker": "INTC","price": 4}]');

        // when
        compile('<div class="flex-item"><angular-ui-grid-directive ctrl="portfolioController"/></div>')(scope);

        // then
        scope.$digest();
        httpMock.flush();
        httpMock.verifyNoOutstandingExpectation();
        httpMock.verifyNoOutstandingRequest();
    });

});