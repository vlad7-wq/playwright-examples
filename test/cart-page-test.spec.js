//@ts-check

import { test, expect } from "@playwright/test";
import { CartPage } from "./page-objects/CartPage";
import { HomePage } from "./page-objects/HomePage";

test.describe("test cart page", () => {
    let cartPage;
    let homePage;

    test.beforeEach( async ({ page }) => {
        cartPage = new CartPage(page);
        homePage = new HomePage(page);
        await page.goto("https://bookcart.azurewebsites.net/");
        await page.waitForLoadState();
        await homePage.searchBook("Slayer");
        await homePage.clickOnAddToCartBtn();
    })

    test("verify that added book is present in cart", async () => {
        await expect(cartPage.cartBody).toBeVisible();
        
    })

    test("verify that by click on '+' button quantity is increased by one", async () => {

    })

    test("verify that by click on '-' button quantity is decreased by one", async () => {

    })

    test("verify that by changing quantity the total price is increased", async () => {

    })

    test("verify that by clicking on 'bin' button the book is removed", async () => {

    })

    test("verify that if cart contains several books the total cart price updated properly", async () => {
        
    })

})