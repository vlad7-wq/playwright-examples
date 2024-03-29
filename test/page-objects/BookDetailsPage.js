//@ts-check

import { expect } from "@playwright/test";

export class BookDetailsPage {

      /**
   * @param {import('@playwright/test').Page} page
   */

      constructor(page) {
        this.page = page;
        this.bookDetailsHeader = page.getByText("Book Details");
        this.bookDetailsContent = page.locator("(//table[@class='table table-lg']//strong)");
        this.bookTitle = page.locator("tbody tr:nth-child(1) td:nth-child(2)");
        this.bookAuthor = page.locator("tbody tr:nth-child(2) td:nth-child(2)");
        this.bookCategory = page.locator("tbody tr:nth-child(3) td:nth-child(2)");
        this.bookPrice = page.locator("tbody tr:nth-child(4) td:nth-child(2)");
        this.addToCartBtn = page.locator("(//button[contains(@class,'mdc-button mdc-button--raised')]//span)[2]");
        this.bookImage = page.locator("//img[@class='mat-mdc-card-image mdc-card__media']");
        
      }

      async verifyBookDetailsContent() {
        const expectedContent = ["Title", "Author", "Category", "Price"];
        expect(expectedContent).toEqual(await this.bookDetailsContent.allTextContents());
      }

      async verifyBookDetailsImage() {
        let src = await this.bookImage.getAttribute("src");
        let resp = await this.page.request.get(`https://bookcart.azurewebsites.net/${src}`);
        expect(resp.status()).toBe(200);
      }

      async verifyBookCategory(category) {
        await expect(this.bookCategory).toHaveText(category);
      }

}