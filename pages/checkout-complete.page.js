export class CheckoutCompletePage {
    
    constructor(page) {
        this.page = page;

        this.completeTitle = page.locator('[data-test="complete-header"]');
        this.backHomeBtn = page.locator('[data-test="back-to-products"]');
    }

    async getCompletionMessage() {
        return this.completeTitle.textContent();
    }
}