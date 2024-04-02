//@ts-check

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
        this.biographyCategoryFilter = page.locator("//a[contains(text(),'Biography')]");
        this.fictionCategoryFilter = page.locator("//a[contains(text(),'Fiction')]");
        this.mysteryCategoryFilter = page.locator("//a[contains(text(),'Mystery')]");
        this.fantasyCategoryFilter = page.locator("//a[contains(text(),'Fantasy')]");
        this.romanceCategoryFilter = page.locator("//a[contains(text(),'Romance')]");
        this.selectContentFirstResult = page.locator("(//div[@class='p-1 ng-star-inserted'])[1]");
        this.titleOfContentFirstResult = page.locator("div[class='card-title my-2'] a strong");
        this.priceOfContentFirstResult = page.locator("mat-card-content[class='mat-mdc-card-content'] p");
        this.searchFieldAutoSuggestion = page.locator("(//span[@class='mdc-list-item__primary-text'])");
        this.priceFilterSlider = page.locator("input[type='range']");
        this.maxPriceValue = page.locator("(//div[@class='d-flex justify-content-between']//strong)[2]");
        this.addToCartBtn = page.locator("(//span[normalize-space()='Add to Cart'])[1]");
        this.itemAddedToCartPopup = page.locator(".mat-mdc-snack-bar-label.mdc-snackbar__label");
    }

    async clickOnAddToCartBtn() {
        await this.addToCartBtn.click();
        await this.page.waitForTimeout(1000);
    }

    async clickOnFirstSearchResult() {
        await this.selectContentFirstResult.click();
    }

    async dragFilterByPrice() {
        await this.priceFilterSlider.dragTo(this.priceFilterSlider, {targetPosition: {x: 10, y: 0}});
    }

    async cleanSearchField() {
        await this.searchField.clear();
    }

    async searchBook(title) {
        await this.searchField.fill(title);
        await this.page.keyboard.press("ArrowDown")
        await this.page.keyboard.press("Enter");
    }
    

    async getSearchAutosuggestOptions(bookTitle) {
        await this.searchField.fill(bookTitle);
        return await this.searchAutosuggestOptions.allTextContents();
    }

    async clickOnCartBtn() {
        await this.cartBtn.click();
    }

    async getRandomCategory() {
        const categories = ["Biography", "Fiction", "Mystery", "Fantasy", "Romance"]
        let randomIndex = Math.floor(Math.random() * 6);
        return categories[randomIndex];
    }

    async selectCategory(category) {
        switch(category) {
            case "Biography":
                await this.biographyCategoryFilter.click();
                break;
            case "Fiction":
                await this.fictionCategoryFilter.click();
                break;
            case "Mystery":
                await this.mysteryCategoryFilter.click();
                break;
            case "Fantasy":
                await this.fantasyCategoryFilter.click();
                break;
            case "Romance":
                await this.romanceCategoryFilter.click();
                break;
        }

        this.clickOnFirstSearchResult();
    }

}