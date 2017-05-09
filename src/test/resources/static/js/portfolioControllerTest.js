describe('portfolioController', function() {

  var scope, controllerService, httpMock;

  beforeEach(module('portfolioApp'));
  beforeEach(inject(function ($rootScope, $controller, $httpBackend) {
    scope = $rootScope.$new();
    controllerService = $controller;
    httpMock = $httpBackend;
  }));

   afterEach(function() {
    httpMock.verifyNoOutstandingExpectation();
    httpMock.verifyNoOutstandingRequest();
  });

  it("controller should get data from portfolio-service back-end", function () {
    // given
    var response = { "cheese":"camembert"};
    // when
    httpMock.expectGET('http://localhost:10000/portfolio').respond(response);
    // then
    var ctrl = controllerService('portfolioController', {$scope: scope});
    httpMock.flush();
    expect(ctrl).toBeDefined();
    expect(scope.portfolio.cheese).toBe(response.cheese);
  });

});
