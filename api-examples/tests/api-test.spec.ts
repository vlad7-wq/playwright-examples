import { request, test, expect } from "@playwright/test";

test.describe("api test examples", () => {

    test("GET request example", async ({ request }) => {
        const resp = await request.get("/api/users?page=1");
        // verify response status code
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

    test("POST request example", async ({ request }) => {
        const resp = await request.post("/api/users", {
            data: {
                "name": "test",
                "job": "test"
            }
        });
        // verify response status code
        expect(resp.status()).toBe(201);
        // verify response data
        const body = await resp.json();
        expect(body.name).toBe("test");
        expect(body.job).toBe("test");
        expect(body.id).not.toHaveLength(0);
        let date = new Date().toISOString().slice(0, 10);
        expect(body.createdAt).toContain(date)
    })

})