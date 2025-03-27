"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOrderStatusService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class GetOrderStatusService {
    async execute(id_status_order) {
        const orderStatus = await prisma_1.default.orders_status.findUnique({
            where: { id_status_order },
            select: {
                id_status_order: true,
                description: true,
                created_at: true,
            },
        });
        return orderStatus;
    }
}
exports.GetOrderStatusService = GetOrderStatusService;
