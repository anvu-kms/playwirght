import { Locator, Page } from "playwright";

export class ProductDetailPage {
    readonly page: Page;
    readonly productName: Locator;
    readonly productDescription: Locator;
    readonly productPrice: Locator;
    readonly addToCartButton: Locator;
    readonly backToProductsButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productName = page.locator('[data-test="inventory-item-name"]');
        this.productDescription = page.locator('[data-test="inventory-item-desc"]');
        this.productPrice = page.locator('[data-test="inventory-item-price"]');
        this.addToCartButton = page.locator('[data-test^="add-to-cart"]');
        this.backToProductsButton = page.locator('[data-test="back-to-products"]');
    }

    // Get product name
    async getProductName() {
        return await this.productName.textContent();
    }

    // Get product price
    async getProductPrice() {
        return await this.productPrice.textContent();
    }

    // Click Back to Products
    async clickBackToProducts() {
        await this.backToProductsButton.click();
    }
}