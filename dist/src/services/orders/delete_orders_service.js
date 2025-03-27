"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteOrderService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class DeleteOrderService {
    async execute(id_order) {
        await prisma_1.default.orders.delete({
            where: { id_order },
        });
    }
}
exports.DeleteOrderService = DeleteOrderService;
