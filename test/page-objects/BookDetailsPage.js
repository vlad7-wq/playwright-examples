//@ts-check

import { expect } from "@playwright/test";

export class BookDetailsPage {

      /**
   * @param {import('@playwright/test').Page} page
   */

      constructor(page) {
        this.page = page;
        this.bookCategory = page.locator("tbody tr:nth-child(3) td:nth-child(2)");
      }

      async verifyBookCategory(category) {
        await expect(this.bookCategory).toHaveText(category);
      }
}