import { After, AfterAll, AfterStep, Before, BeforeAll, setDefaultTimeout } from '@cucumber/cucumber';
import { Browser, chromium, firefox, webkit } from '@playwright/test';
import { config } from './config';
import { CustomWorld } from './world';

setDefaultTimeout(config.stepTimeoutMs);

let browser: Browser;

BeforeAll(async () => {
  const launcher = { chromium, firefox, webkit }[config.browser];
  browser = await launcher.launch({ headless: config.headless });
});

Before(async function (this: CustomWorld) {
  this.context = await browser.newContext({ viewport: { width: 1366, height: 768 } });
  this.context.setDefaultTimeout(config.actionTimeoutMs);
  this.page = await this.context.newPage();
  this.initPages();
});

// Screenshot after every step (pass or fail) as evidence in the report.
AfterStep(async function (this: CustomWorld) {
  const screenshot = await this.page.screenshot();
  await this.attach(screenshot, 'image/png');
});

After(async function (this: CustomWorld) {
  await this.context.close();
});

AfterAll(async () => {
  await browser.close();
});
