//@ts-check

import { test } from "@playwright/test";
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
        await homePage.clickOnFirstSearchResult();
    })

    test("verify that book details page contains all required information", async () => {
        await bookPage.verifyBookDetailsContent();
    })

    test("verify that book image load and displayed properly", async () => {
        await bookPage.verifyBookDetailsImage();
    })
})