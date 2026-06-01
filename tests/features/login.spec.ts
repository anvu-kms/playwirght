import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.cred' });

test('Login - TC001 - Verify error message appear when login with invalid user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoUrl();

    await loginPage.enterCredentials(process.env.USERNAME51 as string, process.env.PASSWORD5 as string);
    await loginPage.clickLoginButton();

    const invalidMessage = await loginPage.getErrorMessageText();
    expect(invalidMessage).toBe('Epic sadface: Sorry, this user has been locked out.');
});

test('Login - TC002 - Verify user can login successfully with valid credentialse', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoUrl();
    await loginPage.enterCredentials(process.env.USERNAME52 as string, process.env.PASSWORD5 as string);
    await loginPage.clickLoginButton();

    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
});