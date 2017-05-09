var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var expect = chai.expect;
var mockserver = require('mockserver');
var http = require('http');
chai.use(chaiAsPromised);

module.exports = function() {

    this.Given(/^there are no portfolio records in the database\.$/, function(next) {
        // nothing to do here!!
        http.createServer(mockserver('cucumber_configuration/mocks')).listen(10000);
        http.createServer(mockserver('cucumber_configuration/mocks')).listen(10001);
        next();
    });

    this.When(/^I make the following trade:$/, function(table, next) {
        //TODO clean up magic Strings!! Get these from the cucumber datatable!!
        var tickerInputBoxElement = element(by.id('ticker'));
        var maxMonthlyInvestmentInputBoxElement = element(by.id('maxMonthlyInvestment'));
        var priceInputBoxElement = element(by.id('price'));
        var submitTradeButtonElement = element(by.id('submitTrade'));
        maxMonthlyInvestmentInputBoxElement.sendKeys('1000');
        tickerInputBoxElement.sendKeys('AAPL');
        priceInputBoxElement.sendKeys('100');
        submitTradeButtonElement.click().then(function() {
            submitTradeButtonElement.getAttribute('value').then(function(txt) {
                expect(txt).to.equal('make another trade');
            });
        });
        next();
    });

    this.Then(/^the following portfolio records should be displayed in the grid:$/, function(table, next) {
        var stringFromNgRepeatInDOM = '(rowRenderIndex, row) in rowContainer.renderedRows track by $index';
        var allRows = element.all(by.repeater(stringFromNgRepeatInDOM));
        var indexOfRowCompensatingForObjectsAddedByGroupingFeature = 3;
        var firstRow = allRows.get(indexOfRowCompensatingForObjectsAddedByGroupingFeature);
        firstRow.getText().then(function(txt) {
            var numOfColumns = txt.split(/\r\n|\r|\n/).length;
            expect(numOfColumns).to.equal(10);
        });
        allRows.count().then(function(numRows) {
            expect(numRows).to.equal(6);
            next();
        });
    });
};