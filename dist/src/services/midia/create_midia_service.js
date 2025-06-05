"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMidiaService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CreateMidiaService {
    async execute({ description }) {
        const midia = await prisma_1.default.midia.create({
            data: { description },
            select: {
                id_midia: true,
                description: true,
                created_at: true,
            },
        });
        return midia;
    }
}
exports.CreateMidiaService = CreateMidiaService;
