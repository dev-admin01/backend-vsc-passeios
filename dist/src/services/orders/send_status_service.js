"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendStatusService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class SendStatusService {
    async execute({ id_order, id_user, id_status_order }) {
        console.log(id_order);
        await prisma_1.default.orders.update({
            where: { id_order },
            data: {
                id_status_order,
            },
        });
        await prisma_1.default.orders_history.create({
            data: {
                id_order,
                id_user,
                id_status_order,
            },
        });
    }
}
exports.SendStatusService = SendStatusService;
