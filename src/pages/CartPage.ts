import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  async itemNames(): Promise<string[]> {
    await this.byTest('cart-list').waitFor();
    return (await this.byTest('inventory-item-name').allInnerTexts()).map((t) => t.trim());
  }

  async checkout(): Promise<void> {
    await this.byTest('checkout').click();
  }
}
