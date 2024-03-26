//@ts-check

import { expect } from "@playwright/test";


export class HomePage {
  /**
   * @param {import('@playwright/test').Page} page
   */

    constructor(page) {
        this.page = page;
    }

    async verifyTitle() {
        await expect(this.page).toHaveTitle("BookCart")
    }

    async verifyUrl() {
        await expect(this.page).toHaveURL("https://bookcart.azurewebsites.net/")
    }
}