import { request, test, expect } from "@playwright/test";

test.describe("api test examples", () => {

    test("GET request example", async ({ request }) => {
        const resp = await request.get("/api/users?page=1");
        // verify status code
        expect(resp.status()).toBe(200);
        expect(resp.statusText()).toBe("OK");
        // verify amount of records per page
        const body = await resp.json();
        expect(body.per_page).toBe(6);
        expect(body.data).toHaveLength(6);
        // verify that 'id' has int data type
        for (let i = 0; i < body.data.length; i++) {
            expect(typeof body.data[i].id).toBe("number");
        }
    })
})