import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

Given('I am on the Sauce Demo login page', async function (this: CustomWorld) {
  await this.loginPage.open();
});

When(
  'I login with username {string} and password {string}',
  async function (this: CustomWorld, username: string, password: string) {
    await this.loginPage.login(username, password);
  },
);

Then('I should land on the products page', async function (this: CustomWorld) {
  await this.inventoryPage.waitForLoaded();
  expect(await this.inventoryPage.title()).toBe('Products');
});

Then(
  'I should see the login error {string}',
  async function (this: CustomWorld, error: string) {
    expect(await this.loginPage.errorText()).toBe(error);
  },
);
