"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orchestrator_1 = __importDefault(require("../../orchestrator"));
beforeAll(async () => {
    await orchestrator_1.default.waitForAllServices();
    await orchestrator_1.default.clearDatabase();
});
describe("GET to /api/v1/migrations sould return 200", () => {
    test("Logged user", async () => {
        const response = await fetch("http://localhost:3000/api/migrations");
        expect(response.status).toBe(200);
        const responseBody = await response.json();
        console.log(responseBody);
        expect(Array.isArray(responseBody.migrations)).toBe(true);
        expect(responseBody.migrations.length).toBeGreaterThan(0);
    });
});
