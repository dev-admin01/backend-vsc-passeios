"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListMidiaService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ListMidiaService {
    async execute() {
        const midias = await prisma_1.default.midia.findMany({
            select: {
                id_midia: true,
                description: true,
                created_at: true,
            },
        });
        return midias;
    }
}
exports.ListMidiaService = ListMidiaService;
