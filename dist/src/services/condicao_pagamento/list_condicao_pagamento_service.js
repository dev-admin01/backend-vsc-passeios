"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCondicaoPagamentoService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ListCondicaoPagamentoService {
    async execute({ search, page, perpage }) {
        const skip = (page - 1) * perpage;
        // Se "search" existir, filtra a coluna "description"
        const whereCondition = search
            ? {
                OR: [
                    {
                        description: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                    {
                        installments: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                    {
                        discount: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                ],
            }
            : {};
        // Conta total de registros
        const totalCount = await prisma_1.default.condicao_Pagamento.count({
            where: whereCondition,
        });
        // Calcula última página
        const lastPage = Math.ceil(totalCount / perpage);
        // Busca registros paginados
        const condicoesPagamento = await prisma_1.default.condicao_Pagamento.findMany({
            where: whereCondition,
            skip,
            take: perpage,
            select: {
                id_cond_pag: true,
                description: true,
                installments: true,
                discount: true,
                created_at: true,
                updated_at: true,
            },
        });
        return {
            condicoesPagamento,
            page,
            perpage,
            lastPage,
            totalCount,
        };
    }
}
exports.ListCondicaoPagamentoService = ListCondicaoPagamentoService;
