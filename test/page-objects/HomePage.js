//@ts-check

import { expect } from "@playwright/test";


export class HomePage {

  /**
   * @param {import('@playwright/test').Page} page
   */

    constructor(page) {
        this.page = page;
        this.searchField = page.getByPlaceholder("Search books or authors");
        this.searchAutosuggestOptions = page.locator("div#mat-autocomplete-0>mat-option>span");
        this.cartBtn = page.locator("button.mdc-icon-button.mat-mdc-icon-button");
        this.loginBtn = page.locator("button[mattooltip='Login']");
        this.allCategoriesFilter = page.getByText("All Categories");
        this.biographyCategoryFilter = page.getByText("Biography");
        this.romanceCategoryFilter = page.getByText("Romance");
        this.selectContentFirstResult = page.locator("div.p-1.ng-star-inserted");
        this.titleOfContentFirstResult = page.locator("div[class='card-title my-2'] a strong");
    }

    async verifyTitle() {
        await expect(this.page).toHaveTitle("BookCart");
    }

    async verifyUrl() {
        await expect(this.page).toHaveURL("https://bookcart.azurewebsites.net/");
    }

    async searchBook(title) {
        await this.searchField.fill(title);
        await this.page.keyboard.press("ArrowDown")
        await this.page.keyboard.press("Enter");
    }

    async verifySearchAutosuggestOptions(bookTitle) {
        let titles = await this.searchAutosuggestOptions.allTextContents();
        for (let title in titles) {
            expect(title).toContain(bookTitle);
        }
    }

    async clicOnCartBtn() {
        await this.cartBtn.click();
    }

    async chooseCategory(category) {
        if  (category.toLowerCase() === "all") {
            await this.allCategoriesFilter.click();
        } else if (category.toLowerCase() === "biography") {
            await this.biographyCategoryFilter.click();
        } else if (category.toLowerCase() === "romance") {
            await this.romanceCategoryFilter.click();
        }
    }

    async verifySearchResult(title) {
        await expect(this.selectContentFirstResult).toBeVisible();
        await expect(this.titleOfContentFirstResult).toContainText(title);
    }

}