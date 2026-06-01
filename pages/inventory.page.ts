import { Locator, Page } from "playwright";

export class InventoryPage {
    readonly page: Page;
    readonly firstItem: Locator;
    readonly firstItemName: Locator;
    readonly firstItemPrice: Locator;
    readonly addToCartButton: Locator;
    readonly removeButton: Locator;
    readonly shoppingCartBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstItem = page.locator('.inventory_item_description').first();
        this.firstItemName = this.firstItem.locator('.inventory_item_name');
        this.firstItemPrice = this.firstItem.locator('.inventory_item_price');
        this.addToCartButton = this.firstItem.locator('#add-to-cart-sauce-labs-backpack');
        this.removeButton = this.firstItem.locator('#remove-sauce-labs-backpack');
        this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    }

    // Get the first item name
    async getFirstItemName() {
        let firstName = await this.firstItemName.textContent();
        return firstName;
    }

    // Click first item name
    async clickFirstItemName() {
        await this.firstItemName.click();
    }

    // Get the first item price
    async getFirstItemPrice() {
        return await this.firstItemPrice.textContent();
    }

    // Add the first item to cart
    async addFirstItemToCart() {
        await this.addToCartButton.click();
        await this.firstItem.locator('#remove-sauce-labs-backpack').waitFor({ state: 'visible' });
    }

    // verify data after clicking 'Add to Cart' button
    async verifyData() {
        await this.addToCartButton.click();
        await this.firstItem.locator('#remove-sauce-labs-backpack').waitFor({ state: 'visible' });
    }

    // Go to Cart page
    async goToCart() {
        await this.shoppingCartBadge.click();
    }
}