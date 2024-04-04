//@ts-check

export class OrdersPage {

    /**
   * @param {import('@playwright/test').Page} page
   */

    constructor(page) {
        this.page = page;
        this.orderId = page.locator("td[role='cell']").first();
        this.orderDate = page.locator("tbody[class='mdc-data-table__content'] > tr > td:nth-child(2)").first();
        this.orderPrice = page.locator("tbody[class='mdc-data-table__content'] > tr > td:nth-child(3)").first();
    }

}