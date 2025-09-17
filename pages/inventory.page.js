export class InventoryPage {
    
    constructor(page) {
        this.page = page;

        this.pageTitle = page.locator('[data-test="title"]');
        this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
        // список товаров на странице
        this.inventoryItems = page.locator('.inventory_item');
        // кнопки 'добавить в корзину' для каждого товара
        this.addToCartButton = page.locator('.inventory_item button.btn_inventory');
        this.sortPriceHighToLow = page.locator('[data-test="product-sort-container"]');
    }

    // выбираем сортировку от дорогих к дешевым и добавляем первый элемент в корзину
    async addTheMostExpensiveItemToCart() {
        await this.sortPriceHighToLow.waitFor({ state:'visible' });
        await this.sortPriceHighToLow.selectOption('hilo');
        const firstItem = this.inventoryItems.first();
        const itemName = await firstItem.locator('.inventory_item_name').textContent();
        await firstItem.locator('button.btn_inventory').click();
        // возвращаем название предмета для проверок
        return itemName.trim();
    }

    async openCart() {
        await this.cartIcon.click();
    }

    // возвращаем заголовок страницы для проверок
    async getPageTitle() {
        return this.pageTitle.textContent();
    }
}