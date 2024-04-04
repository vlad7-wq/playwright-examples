//@ts-check

export class CheckOutPage {

    /**
   * @param {import('@playwright/test').Page} page
   */

    constructor(page) {
        this.page = page;
        this.name = page.getByPlaceholder("Name");
        this.address1 = page.getByPlaceholder("Address Line 1");
        this.address2 = page.getByPlaceholder("Address Line 2");
        this.pincode = page.getByPlaceholder("Pincode");
        this.state = page.getByPlaceholder("State");
        this.placeOrderBtn = page.getByRole("button", { name: "Place Order" });
        this.orderPlacedPopup = page.getByText("Order placed successfully!!!");
    }

    async fillShippingAddress(name, address1, address2, pincode, state) {
        await this.name.fill(name);
        await this.address1.fill(address1);
        await this.address2.fill(address2);
        await this.pincode.fill(pincode);
        await this.state.fill(state)
    }

    async clickOnPlaceOrderBtn() {
        await this.placeOrderBtn.click();
    }

}