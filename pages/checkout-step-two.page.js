export class CheckoutStepTwoPage {

    constructor(page) {
        this.page = page;

        this.summaryInfo = page.locator('[class="summary_info"]');
        this.totalSum = page.locator('[data-test="total-label"]');
        this.finishBtn = page.locator('[data-test="finish"]');
    }

    async finishCheckout() {
        await this.finishBtn.click();
    }
}