export class CartPage {

    constructor(page) {
        this.page = page;

        this.cartItems = page.locator('.cart_item .inventory_item_name');
        this.checkoutBtn = page.locator('[data-test="checkout"]');
        this.continueShoppingBtn = page.locator('[data-test="continue-shopping"]');
    }

    async goToCheckout() {
        await this.checkoutBtn.click();
    }

    async getCartItemsNames() {
        return await this.cartItems.allTextContents();
    }
}