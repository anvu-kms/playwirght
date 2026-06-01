import { Locator, Page } from "playwright";

export class LoginPage {
    readonly page: Page;
    readonly usernameTextBox: Locator;
    readonly passwordTextBox: Locator;
    readonly loginButton: Locator;
    readonly errorMessageText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameTextBox = page.locator('#user-name');
        this.passwordTextBox = page.locator('#password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.errorMessageText = page.locator('[data-test="error"]');
    }

    // Go to page
    async gotoUrl() {
        await this.page.goto(process.env.BASE_URL as string);
    }

    // input username and password
    async enterCredentials(username: string, password: string) {
        await this.usernameTextBox.fill(username);
        await this.passwordTextBox.fill(password);
    }

    // click on Login button
    async clickLoginButton() {
        await this.loginButton.click();
    }

    // Get error message content when logging
    async getErrorMessageText() {
        let content = await this.errorMessageText.textContent();
        return content;
    }
}