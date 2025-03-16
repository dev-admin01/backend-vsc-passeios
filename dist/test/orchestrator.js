"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const async_retry_1 = __importDefault(require("async-retry"));
const index_1 = __importDefault(require("../src/prisma/index"));
const run_migrations_services_1 = require("../src/services/migrations/run_migrations_services");
async function waitForAllServices() {
    await waitForWebServices();
    async function waitForWebServices() {
        return (0, async_retry_1.default)(fetchStatusPage, {
            retries: 100,
            maxTimeout: 1000,
        });
        async function fetchStatusPage() {
            const response = await fetch("http://localhost:3000/api/status");
            if (response.status != 200) {
                throw Error();
            }
        }
    }
}
async function clearDatabase() {
    try {
        await index_1.default.$executeRawUnsafe(`DROP SCHEMA public CASCADE;`);
        await index_1.default.$executeRawUnsafe(`CREATE SCHEMA public;`);
    }
    catch (e) {
        console.error("Erro ao limpar DB:", e);
        throw e;
    }
}
async function runPendingMigrations() {
    const migrationsService = new run_migrations_services_1.RunMigrationsService();
    await migrationsService.execute();
}
const orchestrator = {
    waitForAllServices,
    clearDatabase,
    runPendingMigrations,
};
exports.default = orchestrator;
