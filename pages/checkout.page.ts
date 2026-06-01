import { Locator, Page } from "playwright";

export class CheckoutPage {
    readonly page: Page;
    readonly firstNameTextBox: Locator;
    readonly lastNameTextBox: Locator;
    readonly postalCodeTextBox: Locator;
    readonly continueButton: Locator;
    readonly itemName: Locator;
    readonly finishButton: Locator;
    readonly completeHeader: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameTextBox = page.locator('#first-name');
        this.lastNameTextBox = page.locator('#last-name');
        this.postalCodeTextBox = page.locator('#postal-code');
        this.continueButton = page.locator('#continue');
        this.itemName = page.locator('.inventory_item_name');
        this.finishButton = page.locator('#finish');
        this.completeHeader = page.locator('.complete-header');
    }

    // Enter firstName, lastName, postalCode 
    async enterInformation(firstName: string, lastName: string, postalCode: string) {
        await this.firstNameTextBox.fill(firstName);
        await this.lastNameTextBox.fill(lastName);
        await this.postalCodeTextBox.fill(postalCode);
    }

    // get firstName, lastName, postalCode after inputting
    async getFirstName() {
        return this.firstNameTextBox.inputValue();
    }

    async getLastName() {
        return this.lastNameTextBox.inputValue();
    }

    async getPostalCode() {
        return this.postalCodeTextBox.inputValue();
    }

    async getItemName() {
        return this.itemName.textContent();
    }

    async goToCheckoutOveriview() {
        await this.continueButton.click();
    }

    async goToCheckoutComplete() {
        await this.finishButton.click();
    } 
}
