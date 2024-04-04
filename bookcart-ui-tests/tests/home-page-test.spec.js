//@ts-check

import { expect, test } from "@playwright/test";
import { HomePage } from "../page-objects/HomePage"
import { BookDetailsPage } from "../page-objects/BookDetailsPage";

test.describe("test home page", () => {
    let homePage;
    let bookPage;
    const baseURL = "https://bookcart.azurewebsites.net/";

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        bookPage = new BookDetailsPage(page);
        await page.goto(baseURL);
        await page.waitForLoadState();
    })

    test("verify URL and title of home page", {tag: "@smoke"}, async ({ page }) => {
        await expect(page).toHaveURL(baseURL);
        await expect(page).toHaveTitle("BookCart");
    })

    test("verify that search result contains book that was specified by user", {tag: "@regression, @smoke"}, async ({ page }) => {
        await homePage.searchBook("Martian");
        await page.waitForLoadState();
        await expect(homePage.selectContentFirstResult).toBeVisible();
        await expect(homePage.titleOfContentFirstResult).toContainText("Martian");
    })

    test("verify that search field auto suggestion has all books related to specified title", async () => {
        let titles = await homePage.getSearchAutosuggestOptions("Harry");
        for (let title of titles) {
            expect(title).toContain("Harry");
        }
    })

    test("verify that search field can be cleaned", async () => {
        await homePage.searchBook("pirate");
        await homePage.cleanSearchField();
        await expect(homePage.searchField).toBeEmpty();
    })

    test("verify filtering by category", async () => {
        let randomCategory = await homePage.getRandomCategory();
        await homePage.selectCategory(randomCategory);
        await expect(bookPage.bookCategory).toHaveText(randomCategory);
    })

    test("verify filtering by price", async ({ page }) => {
        await homePage.dragFilterByPrice();
        await page.waitForLoadState();
        expect(await homePage.maxPriceValue.textContent()).toEqual(await homePage.priceOfContentFirstResult.textContent());
    })

})
