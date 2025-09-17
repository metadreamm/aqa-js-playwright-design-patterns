// используем синтаксис классов JS для создания Page Object
export class LoginPage {

    constructor(page) {
        // page - это экземпляр страницы, с которым будем работать
        this.page = page;

        // определяем локаторы для элементов, с которыми будем работать
        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    // открываем страницу
    async open() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    // метод, который инкапсулирует логику входа в систему
    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}