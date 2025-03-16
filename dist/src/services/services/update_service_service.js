"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateServiceService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class UpdateServiceService {
    async execute({ id, description, type, price, observation, }) {
        const updatedService = await prisma_1.default.service.update({
            where: { id_service: id },
            data: { description, type, price, observation },
            select: {
                id_service: true,
                description: true,
                type: true,
                price: true,
                observation: true,
                created_at: true,
                updated_at: true,
            },
        });
        return updatedService;
    }
}
exports.UpdateServiceService = UpdateServiceService;
