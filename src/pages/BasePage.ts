import { Page } from '@playwright/test';

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  protected byTest(id: string) {
    return this.page.locator(`[data-test="${id}"]`);
  }

  async title(): Promise<string> {
    return (await this.byTest('title').innerText()).trim();
  }
}
