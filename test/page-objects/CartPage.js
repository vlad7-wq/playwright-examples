//@ts-check

export class CartPage {

    /**
   * @param {import('@playwright/test').Page} page
   */

    constructor(page) {
        this.page = page;
        this.cartBody = page.locator(".mdc-data-table__content");
        this.eachItemInCartBody = page.locator(".mdc-data-table__content > tr");
        this.bookTitle = page.locator(".mdc-data-table__content :nth-child(2) > a");
        this.decreaseQuantityBtn = page.locator("div[class='d-flex align-items-center'] > div:nth-child(1)");
        this.increaseQuantityBtn = page.locator("div[class='d-flex align-items-center'] > div:nth-child(3)");
        this.quantity = page.locator("div[class='d-flex align-items-center'] > div:nth-child(2)")
        this.totalPrice = page.locator("tbody[role='rowgroup'] > tr > td:nth-child(5)");
        this.binBtn = page.locator("button[mattooltip='Delete item']");
        this.checkoutBtn = page.getByText(" CheckOut ");
        this.removeItemPopup = page.getByText(" One item removed from cart");
        this.addItemPopup = page.getByText(" One item added from cart");
        this.deleteProductPopup = page.getByText(" Product removed from cart ");
        this.totalCartPrice = page.locator("td:nth-child(5) strong:nth-child(1)");
    }

    async clickOnIncreaseBtn() {
        await this.increaseQuantityBtn.click();
    }

    async clickOnDecreaseBtn() {
        await this.decreaseQuantityBtn.click();
    }

    async clickOnBinBtn() {
        await this.binBtn.click();
    }

    async clickOnCheckoutBtn() {
        await this.checkoutBtn.click();
    }

}