import { faker } from "@faker-js/faker"

export function shippingTestData() {
    return {
        name: faker.person.fullName(),
        address1: faker.location.streetAddress(),
        address2: faker.location.secondaryAddress(),
        pincode: faker.string.numeric({ length: 6, exclude: ["0"] }),
        state:  faker.location.state()
    }
}

export function testUserCreds() {
    return {
        name: "pwtest1",
        password: "Qwerty11"
    }
}
