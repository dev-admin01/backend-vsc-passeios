"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderStatusService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CreateOrderStatusService {
    async execute({ description }) {
        const orderStatus = await prisma_1.default.orders_status.create({
            data: { description },
            select: {
                id_status_order: true,
                description: true,
                created_at: true,
            },
        });
        return orderStatus;
    }
}
exports.CreateOrderStatusService = CreateOrderStatusService;
