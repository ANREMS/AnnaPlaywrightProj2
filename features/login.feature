@regression
Feature: Login
  As a user of Sauce Demo
  I want to log in with my credentials
  So that I can access the product catalogue

  Background:
    Given I am on the Sauce Demo login page

  @smoke @sanity
  Scenario Outline: Valid login
    When I login with username "<username>" and password "<password>"
    Then I should land on the products page

    Examples:
      | username                | password     |
      | standard_user           | secret_sauce |
      

    @sanity
    Examples:
      | username                | password     |
      | problem_user            | secret_sauce |
      | performance_glitch_user | secret_sauce |

  @sanity
  Scenario Outline: Invalid login
    When I login with username "<username>" and password "<password>"
    Then I should see the login error "<error>"

    @smoke
    Examples:
      | username        | password     | error                                                                     |
      | invalid_user    | secret_sauce | Epic sadface: Username and password do not match any user in this service |

    Examples:
      | username        | password     | error                                                                     |
      | standard_user   | wrong_pass   | Epic sadface: Username and password do not match any user in this service |
      | locked_out_user | secret_sauce | Epic sadface: Sorry, this user has been locked out.                       |
      |                 | secret_sauce | Epic sadface: Username is required                                        |
      | standard_user   |              | Epic sadface: Password is required                                        |
