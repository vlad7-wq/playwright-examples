//@ts-check

import { test } from "@playwright/test";
import { HomePage } from "./page-objects/HomePage"
import { BookDetailsPage } from "./page-objects/BookDetailsPage";

test.describe("test home page", () => {
    let homePage;
    let bookPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        bookPage = new BookDetailsPage(page);
        await page.goto("https://bookcart.azurewebsites.net/");
        await page.waitForLoadState();
    })

    test("verify URL and title of home page", async () => {
        await homePage.verifyUrl();
        await homePage.verifyTitle();
    })

    test("verify that search result contains book that was specified by user", async () => {
        await homePage.searchBook("martian");
        await homePage.verifySearchResult("Martian");
    })

    test("verify that search field auto suggestion has all books related to specified title", async () => {
        await homePage.verifySearchAutosuggestOptions("Harry");
    })

    test("verify that search field can be cleaned", async () => {
        await homePage.searchBook("pirate");
        await homePage.verifyCleanSearchField();
    })

    test("verify filter by category", async () => {
        await homePage.selectCategory("Romance");
        await bookPage.verifyBookCategory("Romance");
    })

})
