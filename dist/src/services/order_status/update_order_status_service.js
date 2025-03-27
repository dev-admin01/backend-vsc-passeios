"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrderStatusService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class UpdateOrderStatusService {
    async execute({ id_status_order, description }) {
        const updated = await prisma_1.default.orders_status.update({
            where: { id_status_order },
            data: { description },
            select: {
                id_status_order: true,
                description: true,
                created_at: true,
            },
        });
        return updated;
    }
}
exports.UpdateOrderStatusService = UpdateOrderStatusService;
