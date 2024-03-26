import { test } from "@playwright/test";
import { HomePage } from "./page-objects/HomePage"

test.describe("test home page", () => {
    let homePage;

    test.beforeEach(async ({ page }) => {
        await page.goto("https://bookcart.azurewebsites.net/");
        homePage = new HomePage(page);
    });

    test("verify URL", async () => {
        await homePage.verifyUrl();
    })

    test("verify title", async () => {
        await homePage.verifyTitle();
    });
});
