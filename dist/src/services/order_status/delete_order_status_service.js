"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteOrderStatusService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class DeleteOrderStatusService {
    async execute(id_status_order) {
        await prisma_1.default.orders_status.delete({
            where: { id_status_order },
        });
    }
}
exports.DeleteOrderStatusService = DeleteOrderStatusService;
