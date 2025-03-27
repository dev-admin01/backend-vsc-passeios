"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOrderService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class GetOrderService {
    async execute(id_order) {
        const order = await prisma_1.default.orders.findUnique({
            where: { id_order },
            include: {
                costumer: true,
                user: true,
                status: true,
                orders_service: {
                    include: {
                        service: {
                            select: {
                                description: true,
                                type: true,
                                observation: true,
                            },
                        },
                    },
                },
                orders_history: true,
            },
        });
        return order;
    }
}
exports.GetOrderService = GetOrderService;
