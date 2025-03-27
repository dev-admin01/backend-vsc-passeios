"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListOrderStatusService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ListOrderStatusService {
    async execute({ search, page, perpage }) {
        const skip = (page - 1) * perpage;
        // Se "search" existir, filtra a coluna "description"
        const whereCondition = search
            ? {
                description: {
                    contains: search,
                    mode: "insensitive",
                },
            }
            : {};
        // Conta total de registros
        const totalCount = await prisma_1.default.orders_status.count({
            where: whereCondition,
        });
        // Calcula última página
        const lastPage = Math.ceil(totalCount / perpage);
        // Busca registros paginados
        const orderStatus = await prisma_1.default.orders_status.findMany({
            where: whereCondition,
            skip,
            take: perpage,
            select: {
                id_status_order: true,
                description: true,
                created_at: true,
            },
        });
        return {
            orderStatus,
            page,
            perpage,
            lastPage,
            totalCount,
        };
    }
}
exports.ListOrderStatusService = ListOrderStatusService;
