import { Locator, Page } from "playwright";

export class CartPage {
    readonly page: Page;
    readonly itemName: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.itemName = page.locator('.inventory_item_name');
        this.checkoutButton = page.locator('#checkout');
    }

    // Go to Checkout page
    async goToCheckout() {
        await this.checkoutButton.click();
    }

    async getItemName() {
        return this.itemName.textContent();
    }

}