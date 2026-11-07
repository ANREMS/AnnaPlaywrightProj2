@regression
Feature: End-to-end purchase journey
  As a logged in customer
  I want to buy products
  So that I receive an order confirmation

  Scenario Outline: Complete purchase of products
    Given I am on the Sauce Demo login page
    And I login with username "<username>" and password "<password>"
    When I add the products "<products>" to the cart
    Then the cart badge should show "<count>" items
    When I open the cart
    Then the cart should contain the products "<products>"
    When I proceed to checkout
    And I enter checkout details first name "<firstName>" last name "<lastName>" and postal code "<postalCode>"
    Then the order overview should list the products "<products>"
    And the item total should equal the sum of the product prices
    When I finish the order
    Then I should see the order confirmation "Thank you for your order!"
    When I go back to the products page
    Then I should land on the products page

    @smoke @sanity
    Examples:
      | username      | password     | products                  | count | firstName | lastName | postalCode |
      | standard_user | secret_sauce | Sauce Labs Backpack       | 1     | Anna      | Tester   | 12345      |

    @sanity
    Examples:
      | username      | password     | products                                             | count | firstName | lastName | postalCode |
      | standard_user | secret_sauce | Sauce Labs Backpack;Sauce Labs Bike Light            | 2     | John      | Smith    | 560001     |

    Examples:
      | username      | password     | products                                                                                   | count | firstName | lastName | postalCode |
      | standard_user | secret_sauce | Sauce Labs Bolt T-Shirt;Sauce Labs Fleece Jacket;Test.allTheThings() T-Shirt (Red)         | 3     | Mary      | Jones    | 90210      |

  @regression
  Scenario Outline: Checkout cannot continue with missing details
    Given I am on the Sauce Demo login page
    And I login with username "standard_user" and password "secret_sauce"
    When I add the products "Sauce Labs Backpack" to the cart
    And I open the cart
    And I proceed to checkout
    And I enter checkout details first name "<firstName>" last name "<lastName>" and postal code "<postalCode>"
    Then I should see the checkout error "<error>"

    Examples:
      | firstName | lastName | postalCode | error                          |
      |           | Tester   | 12345      | Error: First Name is required  |
      | Anna      |          | 12345      | Error: Last Name is required   |
      | Anna      | Tester   |            | Error: Postal Code is required |
