"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMidiaService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class UpdateMidiaService {
    async execute(id, { description }) {
        const midia = await prisma_1.default.midia.update({
            where: {
                id_midia: id,
            },
            data: {
                description,
            },
            select: {
                id_midia: true,
                description: true,
                created_at: true,
            },
        });
        return midia;
    }
}
exports.UpdateMidiaService = UpdateMidiaService;
