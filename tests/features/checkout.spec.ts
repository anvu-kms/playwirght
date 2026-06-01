import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { InventoryPage } from '../../pages/inventory.page';
import { CommonPage } from '../../pages/common.page';
import { CartPage } from '../../pages/cart.page';
import { CheckoutPage } from '../../pages/checkout.page';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.cred' });

test('Checkout - TC001 - Verify user can order product successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const commonPage = new CommonPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.gotoUrl();
    await loginPage.enterCredentials(process.env.USERNAME52 as string, process.env.PASSWORD5 as string);
    await loginPage.clickLoginButton();

    // Inventory
    expect(await commonPage.getTitle()).toBe('Products');
    const firstName = await inventoryPage.getFirstItemName();
    inventoryPage.addFirstItemToCart();
    expect(await inventoryPage.removeButton.textContent()).toBe('Remove');
    await expect(inventoryPage.shoppingCartBadge).toHaveText('1');
    await inventoryPage.goToCart();

    // Cart page
    expect(await commonPage.getTitle()).toBe('Your Cart');
    expect(await cartPage.getItemName()).toBe(`${firstName}`);
    await cartPage.goToCheckout();

    // Checkout - Your Information page
    expect(await commonPage.getTitle()).toBe('Checkout: Your Information');
    const first = 'first';
    const last = 'last';
    const postCode = '7600';

    await checkoutPage.enterInformation(first, last, postCode);
    expect (await checkoutPage.getFirstName()).toBe(first);
    expect (await checkoutPage.getLastName()).toBe(last);
    expect (await checkoutPage.getPostalCode()).toBe(postCode);
    await checkoutPage.goToCheckoutOveriview();

    // Checkout - Overview Page
    expect(await commonPage.getTitle()).toBe('Checkout: Overview');
    expect(await checkoutPage.getItemName()).toBe(`${firstName}`);
    await checkoutPage.goToCheckoutComplete();

    // Checkout - Complete Page
    expect(await commonPage.getTitle()).toBe('Checkout: Complete!');
    expect(await commonPage.getCompleteHeader()).toBe('Thank you for your order!');
    expect(await commonPage.getCompleteText()).toBe('Your order has been dispatched, and will arrive just as fast as the pony can get there!');    
});