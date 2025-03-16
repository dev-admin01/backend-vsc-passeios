"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const globals_1 = require("@jest/globals");
const prisma_1 = __importDefault(require("../../../src/prisma"));
(0, globals_1.describe)("Users Integration Test", () => {
    (0, globals_1.describe)("POST /api/createuser", () => {
        (0, globals_1.beforeEach)(async () => {
            await prisma_1.default.user.deleteMany();
        });
        (0, globals_1.afterAll)(async () => {
            await prisma_1.default.user.deleteMany();
        });
        (0, globals_1.test)("should create a user", async () => {
            let user = {
                name: "teste123",
                email: "teste123@teste.com",
                password: "senha123",
                id_position: 1,
                ddi: "55",
                ddd: "11",
                phone: "999995555",
            };
            const response = await fetch("http://localhost:3000/api/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            const responseBody = await response.json();
            (0, globals_1.expect)(responseBody.user).toEqual({
                id_user: responseBody.user.id_user,
                name: "teste123",
                email: "teste123@teste.com",
                id_position: 1,
                ddi: "55",
                ddd: "11",
                phone: "999995555",
                created_at: responseBody.user.created_at,
                updated_at: responseBody.user.updated_at,
            });
            (0, globals_1.expect)((0, uuid_1.version)(responseBody.user.id_user)).toBe(4);
            (0, globals_1.expect)(Date.parse(responseBody.user.created_at)).not.toBeNaN();
            (0, globals_1.expect)(Date.parse(responseBody.user.updated_at)).not.toBeNaN();
        });
    });
});
