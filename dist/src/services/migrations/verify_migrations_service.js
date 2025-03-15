"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyMigrationsService = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const promises_1 = require("fs/promises");
class VerifyMigrationsService {
    async execute() {
        const migrationsDir = path_1.default.join(process.cwd(), "prisma", "migrations");
        if (!fs_1.default.existsSync(migrationsDir)) {
            throw new Error(`Diretório de migrations não encontrado: ${migrationsDir}`);
        }
        try {
            const allMigrations = await (0, promises_1.readdir)(migrationsDir);
            return allMigrations;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.VerifyMigrationsService = VerifyMigrationsService;
