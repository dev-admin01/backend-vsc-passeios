"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMidiaService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class GetMidiaService {
    async execute(id) {
        const midia = await prisma_1.default.midia.findUnique({
            where: {
                id_midia: id,
            },
            select: {
                id_midia: true,
                description: true,
                created_at: true,
            },
        });
        if (!midia) {
            throw new Error("Mídia não encontrada");
        }
        return midia;
    }
}
exports.GetMidiaService = GetMidiaService;
