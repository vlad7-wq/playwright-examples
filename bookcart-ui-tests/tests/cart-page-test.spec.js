//@ts-check

import { test, expect } from "@playwright/test";
import { CartPage } from "../page-objects/CartPage";
import { HomePage } from "../page-objects/HomePage";

test.describe("test cart page", () => {
    let cartPage;
    let homePage;

    test.beforeEach( async ({ page }) => {
        cartPage = new CartPage(page);
        homePage = new HomePage(page);
        await page.goto("https://bookcart.azurewebsites.net/", { timeout : 20000} );
        await homePage.searchBook("Slayer");
        await homePage.clickOnAddToCartBtn();
        await homePage.clickOnCartBtn()
    })

    test("verify that added book is present in cart", {tag: "@smoke, @regression"}, async () => {
        await expect(cartPage.cartBody).toBeVisible();
        await expect(cartPage.bookTitle).toContainText("Slayer")
    })

    test("verify that by click on plus/minus button quantity is updated properly", async () => {
        await cartPage.clickOnIncreaseBtn();
        await expect(cartPage.addItemPopup).toBeVisible();
        await expect(cartPage.quantity).toHaveText("2");
        await cartPage.clickOnDecreaseBtn();
        await expect(cartPage.removeItemPopup).toBeVisible();
        await expect(cartPage.quantity).toHaveText("1");
    })

    test("verify that by changing quantity the total price is updated", async () => {
        await cartPage.clickOnIncreaseBtn();
        await expect(cartPage.addItemPopup).toBeVisible();
        await expect(cartPage.quantity).toHaveText("2");
        let totalPrice = await cartPage.totalPrice.textContent();
        expect(totalPrice).toBe(" ₹2,468.00 ");
    })

    test("verify that by clicking on bin button the book is removed", async () => {
        await cartPage.clickOnBinBtn();
        await expect(cartPage.deleteProductPopup).toBeVisible();
        await expect(cartPage.cartBody).not.toBeVisible();
    })

    test("verify that if cart contains several books the total cart price updated properly", async ({page}) => {
        await homePage.searchBook("Rot");
        await homePage.clickOnAddToCartBtn();
        await homePage.clickOnCartBtn();
        await expect(cartPage.eachItemInCartBody).toHaveCount(2);
        let totalCartPrice = await cartPage.totalCartPrice.textContent();
        expect(totalCartPrice).toBe("₹1,357.00");
    })

})