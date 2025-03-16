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
describe("POST /api/v1/migrations", () => {
    describe("Anonymous user", () => {
        describe("Running pending migrations", () => {
            test("For the first time", async () => {
                const response1 = await fetch("http://localhost:3000/api/migrations", {
                    method: "POST",
                });
                expect(response1.status).toBe(201);
                const response1Body = await response1.json();
                console.log("responseBody1", response1Body);
                expect(Array.isArray(response1Body)).toBe(true);
                expect(response1Body.length).toBeGreaterThan(0);
            });
            test("For the second time", async () => {
                const response2 = await fetch("http://localhost:3000/api/migrations", {
                    method: "POST",
                });
                expect(response2.status).toBe(201);
                const response2Body = await response2.json();
                console.log("responseBody2", response2Body);
                expect(Array.isArray(response2Body)).toBe(true);
                expect(response2Body.length).toBe(0);
            });
        });
    });
});
