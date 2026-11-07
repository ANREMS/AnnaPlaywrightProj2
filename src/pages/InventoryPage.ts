import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  private readonly cartLink = this.byTest('shopping-cart-link');
  private readonly cartBadge = this.byTest('shopping-cart-badge');

  async waitForLoaded(): Promise<void> {
    await this.page.waitForURL('**/inventory.html');
    await this.byTest('inventory-list').waitFor();
  }

  async addProduct(name: string): Promise<void> {
    const item = this.page.locator('[data-test="inventory-item"]').filter({
      has: this.page.locator('[data-test="inventory-item-name"]', { hasText: name }),
    });
    await item.getByRole('button', { name: 'Add to cart' }).click();
  }

  async cartCount(): Promise<number> {
    if ((await this.cartBadge.count()) === 0) return 0;
    return Number(await this.cartBadge.innerText());
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}
