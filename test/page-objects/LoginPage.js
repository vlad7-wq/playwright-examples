//@ts-check

export class LoginPage {

    /**
   * @param {import('@playwright/test').Page} page
   */

    constructor(page) {
        this.page = page;
        this.userNameInputField = page.locator("#mat-input-0");
        this.passwordInputField = page.locator("#mat-input-1");
        this.loginBtn = page.locator('mat-card-actions').getByRole('button', { name: 'Login' })
    }

    async login(name, pwd) {
        await this.userNameInputField.fill(name);
        await this.passwordInputField.fill(pwd);
        await this.loginBtn.click();
    }

}