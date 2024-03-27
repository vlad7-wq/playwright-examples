//@ts-check

import { test } from "@playwright/test";
import { HomePage } from "./page-objects/HomePage"

test.describe("test home page", () => {
    let homePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await page.goto("https://bookcart.azurewebsites.net/");
        await page.waitForLoadState();
    })

    test("verify URL and title of home page", async () => {
        await homePage.verifyUrl();
        await homePage.verifyTitle();
    })

    test("verify search", async () => {
        await test.step("search for any book by title", async () => {
            await homePage.searchBook("harry");
            await homePage.verifySearchResult("Harry");
        })
    })


})
