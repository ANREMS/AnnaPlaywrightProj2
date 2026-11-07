import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

const parseProducts = (list: string): string[] =>
  list.split(';').map((p) => p.trim()).filter(Boolean);

When(
  'I add the products {string} to the cart',
  async function (this: CustomWorld, products: string) {
    await this.inventoryPage.waitForLoaded();
    for (const name of parseProducts(products)) {
      await this.inventoryPage.addProduct(name);
    }
  },
);

Then(
  'the cart badge should show {string} items',
  async function (this: CustomWorld, count: string) {
    expect(await this.inventoryPage.cartCount()).toBe(Number(count));
  },
);

When('I open the cart', async function (this: CustomWorld) {
  await this.inventoryPage.openCart();
});

Then(
  'the cart should contain the products {string}',
  async function (this: CustomWorld, products: string) {
    expect((await this.cartPage.itemNames()).sort()).toEqual(parseProducts(products).sort());
  },
);

When('I proceed to checkout', async function (this: CustomWorld) {
  await this.cartPage.checkout();
});

When(
  'I enter checkout details first name {string} last name {string} and postal code {string}',
  async function (this: CustomWorld, firstName: string, lastName: string, postalCode: string) {
    await this.checkoutPage.fillDetails(firstName, lastName, postalCode);
  },
);

Then(
  'I should see the checkout error {string}',
  async function (this: CustomWorld, error: string) {
    expect(await this.checkoutPage.errorText()).toBe(error);
  },
);

Then(
  'the order overview should list the products {string}',
  async function (this: CustomWorld, products: string) {
    expect((await this.checkoutPage.overviewItemNames()).sort()).toEqual(
      parseProducts(products).sort(),
    );
  },
);

Then('the item total should equal the sum of the product prices', async function (this: CustomWorld) {
  const sum = (await this.checkoutPage.overviewItemPrices()).reduce((a, b) => a + b, 0);
  expect(await this.checkoutPage.itemTotal()).toBeCloseTo(sum, 2);
});

When('I finish the order', async function (this: CustomWorld) {
  await this.checkoutPage.finish();
});

Then(
  'I should see the order confirmation {string}',
  async function (this: CustomWorld, message: string) {
    expect(await this.checkoutPage.confirmationHeader()).toBe(message);
  },
);

When('I go back to the products page', async function (this: CustomWorld) {
  await this.checkoutPage.backToProducts();
});
