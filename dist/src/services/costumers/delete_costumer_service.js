"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCostumerService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class DeleteCostumerService {
    async execute(id_costumer) {
        await prisma_1.default.costumer.delete({
            where: { id_costumer },
        });
    }
}
exports.DeleteCostumerService = DeleteCostumerService;
