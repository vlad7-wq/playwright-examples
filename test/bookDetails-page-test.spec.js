//@ts-check

import { test, expect } from "@playwright/test";
import { BookDetailsPage } from "./page-objects/BookDetailsPage";
import { HomePage } from "./page-objects/HomePage";

test.describe("verify book details page", () => {
    let bookPage;
    let homePage;

    test.beforeEach(async ({ page }) => {
        bookPage = new BookDetailsPage(page);
        homePage = new HomePage(page);
        await page.goto("https://bookcart.azurewebsites.net/");
        await page.waitForLoadState();
    })

    test("verify that book details page contains all required information", async () => {
        await homePage.clickOnFirstSearchResult();
        const expectedContent = ["Title", "Author", "Category", "Price"];
        expect(expectedContent).toEqual(await bookPage.getBookDetailsContent());
    })

    test("verify that book image load and displayed properly", async ({ page }) => {
        await homePage.clickOnFirstSearchResult();
        expect(bookPage.bookImage).toBeVisible();
        // get full URL of image and make a http GET request to make sure that image is loaded properly
        let src = await bookPage.getBookDetailsMainImageSrc();
        let resp = await page.request.get(`https://bookcart.azurewebsites.net/${src}`);
        expect(resp.status()).toBe(200);
    })
})