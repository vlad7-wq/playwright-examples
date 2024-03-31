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

      async getBookDetailsContent() {
        return this.bookDetailsContent.allTextContents();
      }

      async getBookDetailsMainImage() {
        return this.bookImage;
      }

      async getBookDetailsMainImageSrc() {
        return this.bookImage.getAttribute("src");
      }

      async verifyBookCategory(category) {
        await expect(this.bookCategory).toHaveText(category);
      }

}