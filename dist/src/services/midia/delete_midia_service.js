"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteMidiaService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class DeleteMidiaService {
    async execute(id) {
        const midia = await prisma_1.default.midia.delete({
            where: {
                id_midia: id,
            },
        });
        return midia;
    }
}
exports.DeleteMidiaService = DeleteMidiaService;
