import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  async fillDetails(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.byTest('firstName').fill(firstName);
    await this.byTest('lastName').fill(lastName);
    await this.byTest('postalCode').fill(postalCode);
    await this.byTest('continue').click();
  }

  async errorText(): Promise<string> {
    const error = this.byTest('error');
    await error.waitFor();
    return (await error.innerText()).trim();
  }

  async overviewItemNames(): Promise<string[]> {
    await this.byTest('subtotal-label').waitFor();
    return (await this.byTest('inventory-item-name').allInnerTexts()).map((t) => t.trim());
  }

  async overviewItemPrices(): Promise<number[]> {
    const prices = await this.byTest('inventory-item-price').allInnerTexts();
    return prices.map((p) => Number(p.replace('$', '')));
  }

  async itemTotal(): Promise<number> {
    const text = await this.byTest('subtotal-label').innerText();
    return Number(text.replace(/[^0-9.]/g, ''));
  }

  async finish(): Promise<void> {
    await this.byTest('finish').click();
  }

  async confirmationHeader(): Promise<string> {
    const header = this.byTest('complete-header');
    await header.waitFor();
    return (await header.innerText()).trim();
  }

  async backToProducts(): Promise<void> {
    await this.byTest('back-to-products').click();
  }
}
