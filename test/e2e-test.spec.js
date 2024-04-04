//@ts-check

import { test, expect } from "@playwright/test";
import { CheckOutPage } from "./page-objects/CheckoutPage";
import { LoginPage } from "./page-objects/LoginPage";
import { HomePage } from "./page-objects/HomePage";
import { CartPage } from "./page-objects/CartPage";
import { OrdersPage } from "./page-objects/OrdersPage";
import { getCurrentDate } from "./page-objects/date-formatter";
import { shippingTestData, testUserCreds } from "./page-objects/test-data";

test.describe("example of e2e test", () => {
    let homePage;
    let cartPage;
    let loginPage;
    let checkoutPage;
    let ordersPage;
    const userCreds = testUserCreds();
    const shippingData = shippingTestData();

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        cartPage = new CartPage(page);
        loginPage = new LoginPage(page);
        checkoutPage = new CheckOutPage(page);
        ordersPage = new OrdersPage(page);
        
        await page.goto("https://bookcart.azurewebsites.net/", { timeout : 20000} );
        
    })

    test("e2e test happy path", async ({ page }) => {
        let totalPrice;

        await test.step("search for a book", async () => {
            await homePage.searchBook("Ministry");
            await expect.soft(homePage.selectContentFirstResult).toBeVisible();
        });

        await test.step("click on add to cart", async () => {
            await homePage.clickOnAddToCartBtn();
            await expect.soft(homePage.itemAddedToCartPopup).toBeVisible();
        });

        await test.step("go to the cart page", async () => {
            await homePage.clickOnCartBtn();
            totalPrice = await cartPage.totalCartPrice.textContent();
            await expect.soft(cartPage.bookTitle).toContainText("Ministry");
        });

        await test.step("click on checkout button", async () => {
            await cartPage.clickOnCheckoutBtn();
        });

        await test.step("log in", async () => {
            await loginPage.login(userCreds.name, userCreds.password);
            await page.waitForURL("**/checkout");
        });

        await test.step("fill shipping info", async () => {
            await checkoutPage.fillShippingAddress(shippingData.name, shippingData.address1, 
                shippingData.address2, shippingData.pincode, shippingData.state);
        });

        await test.step("click on place order button", async () => {
            await checkoutPage.clickOnPlaceOrderBtn();
            await expect.soft(checkoutPage.orderPlacedPopup).toBeVisible();
        });

        await test.step("verify that order is created", async () => {
            await expect(ordersPage.orderId).not.toBeEmpty();
            expect(await ordersPage.orderDate.textContent()).toEqual(getCurrentDate());
            expect(await ordersPage.orderPrice.textContent()).toEqual(` ${totalPrice} `);
        });
    
    })
})