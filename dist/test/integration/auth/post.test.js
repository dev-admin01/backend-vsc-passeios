"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const orchestrator_1 = __importDefault(require("../../orchestrator"));
beforeAll(async () => {
    await orchestrator_1.default.waitForAllServices();
    await orchestrator_1.default.clearDatabase();
    await orchestrator_1.default.runPendingMigrations();
});
afterEach(async () => {
    await orchestrator_1.default.clearDatabase();
    await orchestrator_1.default.runPendingMigrations();
});
describe("POST api/auth", () => {
    test("with valid data", async () => {
        let user = {
            name: "teste123",
            email: "testando@teste.com",
            password: "senha123",
            id_position: 1,
            ddi: "55",
            ddd: "11",
            phone: "999995555",
        };
        const response = await fetch("http://localhost:3000/api/user", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(user),
        });
        const responseBody = await response.json();
        const response1 = await fetch("http://localhost:3000/api/auth", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                email: "testando@teste.com",
                password: "senha123",
            }),
        });
        expect(response1.status).toBe(200);
        const responseBody1 = await response1.json();
        expect((0, uuid_1.version)(responseBody1.user.id_user)).toBe(4);
        expect(responseBody1.user).toMatchObject({
            id_user: responseBody.user.id_user,
            name: "teste123",
            email: "testando@teste.com",
            id_position: 1,
        });
    });
    test("with invalid data", async () => {
        let user = {
            name: "teste123",
            email: "testando@teste.com",
            password: "senha123",
            id_position: 1,
            ddi: "55",
            ddd: "11",
            phone: "999995555",
        };
        const response = await fetch("http://localhost:3000/api/user", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(user),
        });
        const response1 = await fetch("http://localhost:3000/api/auth", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                email: "testando@teste.com",
                password: "senhaerrada123",
            }),
        });
        expect(response1.status).toBe(400);
        const responseBody1 = await response1.json();
        expect(responseBody1).toMatchObject({
            message: "Usuário ou Senha inválidos.",
            status_code: 400,
        });
    });
});
