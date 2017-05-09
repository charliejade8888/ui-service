#noinspection CucumberUndefinedStep
Feature: Trade form can be used to execute trades and generate portfolio

  @dev
  Scenario: Making a trade
    Given there are no portfolio records in the database.
    When I make the following trade:
    | ticker | maxMonthlyInvestment | price |
    | AAPL   | 1000                 | 100   |
    Then the following portfolio records should be displayed in the grid:
    | dateTime                | ticker | numOfSharesToBuy | numOfSharesHeld | sharesHeldValue | cashHeldValue | accountValue | price | buyAdvice | maxMonthlyInvestment |
    | 2017-01-27T07:09:51.863 | AAPL   | 7                | 7               | 700             | 300           | 1000         | 100   | 700       | 1000                 |
