import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { InventoryPage } from '../../pages/inventory.page';
import { ProductDetailPage } from '../../pages/productDetail.page';
import { CommonPage } from '../../pages/common.page';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.cred' });

test('Product - TC001 - Verify sort by price', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoUrl();
    await loginPage.enterCredentials(process.env.USERNAME52 as string, process.env.PASSWORD5 as string);
    await loginPage.clickLoginButton();

    await expect(page.locator('[data-test="title"]')).toHaveText('Products');

    // select sort
    await page.selectOption('.product_sort_container', { label: 'Price (low to high)' });

    // Get the list of prices
    const priceListString = await page.locator('.inventory_item_price').allTextContents();
    const priceListNumber = priceListString.map(price => parseFloat(price.replace('$', '')));
  
    for (let i = 0; i < priceListNumber.length - 1; i++) {
        expect(priceListNumber[i]).toBeLessThanOrEqual(priceListNumber[i + 1]);
    }
});

test('Product - TC002 - Verify Product Detail page displays correct product information', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const commonPage = new CommonPage(page);
    const inventoryPage = new InventoryPage(page);
    const productDetailPage = new ProductDetailPage(page);

    await loginPage.gotoUrl();
    await loginPage.enterCredentials(process.env.USERNAME52 as string, process.env.PASSWORD5 as string);
    await loginPage.clickLoginButton();

    // Inventory Page
    expect(await commonPage.getTitle()).toBe('Products');
    const expectedProductName = await inventoryPage.getFirstItemName();
    const expectedPrice = await inventoryPage.getFirstItemPrice();
    expect(expectedPrice).not.toBeNull();
    await inventoryPage.clickFirstItemName();

    // Product Detail Page
    await expect(page).toHaveURL(/inventory-item/);
    expect(await productDetailPage.getProductName()).toBe(expectedProductName);
    expect(await productDetailPage.getProductPrice()).toBe(expectedPrice);
});