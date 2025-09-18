import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutStepOnePage } from '../pages/checkout-step-one.page';
import { CheckoutStepTwoPage } from '../pages/checkout-step-two.page';
import { CheckoutCompletePage } from '../pages/checkout-complete.page';


test('E2E: login, add most expensive item to cart, checkout and verify order completion', async ({ page }) => {
    // инициализируем Page Objects, передавая им объект 'page'
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);

    // используем методы Page Object для взаимодействия со страницей
    // LoginPage
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');

    // InventoryPage
    const pageTitle = await inventoryPage.getPageTitle();
    expect(pageTitle).toBe('Products');

    const addedItemName = await inventoryPage.addTheMostExpensiveItemToCart();

    await inventoryPage.openCart();

    // CartPage
    // проверяем, находится ли в корзине тот товар, который мы добавили
    const cartItems = await cartPage.getCartItemsNames();
    expect(cartItems).toContain(addedItemName);

    await cartPage.goToCheckout();

    // Checkout1 page
    await checkoutStepOnePage.fillUserInfo('John', 'Doe', '02-003');
    await checkoutStepOnePage.continueCheckout();

    // Checkout2 page
    await checkoutStepTwoPage.finishCheckout();

    // Finish page
    const completionMessage = await checkoutCompletePage.getCompletionMessage();
    expect(completionMessage).toContain('Thank you for your order!');
});