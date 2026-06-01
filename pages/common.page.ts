import { Locator, Page } from "playwright";

export class CommonPage {
    readonly page: Page;
    readonly title: Locator;
    readonly completeHeader: Locator;
    readonly completeText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('[data-test="title"]');
        this.completeHeader = page.locator('[data-test="complete-header"]');
        this.completeText = page.locator('[data-test="complete-text"]');
    }

    // Get content of Title after navigate to new page
    async getTitle() {
        let content = await this.title.textContent();
        return content;
    }

    // Get content of Header after navigate to new page
    async getCompleteHeader() {
        let content = await this.completeHeader.textContent();
        return content;
    }

    // Get content of text after navigate to new page
    async getCompleteText() {
        let content = await this.completeText.textContent();
        return content;
    }
}