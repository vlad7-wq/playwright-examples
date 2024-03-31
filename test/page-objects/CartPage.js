//@ts-check

export class CartPage {

    /**
   * @param {import('@playwright/test').Page} page
   */

    constructor(page) {
        this.page = page;
        this.cartBody = page.locator(".mdc-data-table__content");
        this.bookTitle = page.locator(".mdc-data-table__content :nth-child(2) > a");
        this.decreaseQuantityBtn = page.locator("div[class='d-flex align-items-center'] > div:nth-child(1)");
        this.increaseQuantityBtn = page.locator("div[class='d-flex align-items-center'] > div:nth-child(3)");
        this.quantity = page.locator("div[class='d-flex align-items-center'] > div:nth-child(2)")
        this.totalPrice = page.locator("tbody[role='rowgroup'] > tr > td:nth-child(5)");
        this.binBtn = page.locator("button[mattooltip='Delete item']");
        this.checkoutBtn = page.getByText(" CheckOut ");
    }

}