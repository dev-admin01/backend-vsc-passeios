"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
describe("GET /api/services", () => {
    test("should service a user", async () => {
        const response1 = await fetch("http://localhost:3000/api/auth", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                email: "teste@teste.com",
                password: "senha123",
            }),
        });
        const responseBody1 = await response1.json();
        const response = await fetch("http://localhost:3000/api/services", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${responseBody1.user.token}`,
            },
        });
        const responseBody = await response.json();
        expect(responseBody.service).toEqual({
            id_service: responseBody.service.id_service,
            description: "servico teste",
            type: "0",
            price: "100.25",
            observation: "observacao teste texto bem grande mmesmoa e uma observacao",
            created_at: responseBody.service.created_at,
            updated_at: responseBody.service.updated_at,
        });
        expect(Date.parse(responseBody.service.created_at)).not.toBeNaN();
        expect(Date.parse(responseBody.service.updated_at)).not.toBeNaN();
    });
});
