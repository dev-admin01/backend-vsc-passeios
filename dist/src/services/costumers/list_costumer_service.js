"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCostumerService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ListCostumerService {
    async execute({ search, page, perpage }) {
        const skip = (page - 1) * perpage;
        // Filtro para busca em vários campos, usando modo "insensitive"
        const whereCondition = search
            ? {
                OR: [
                    { nome: { contains: search, mode: "insensitive" } },
                    { email: { contains: search, mode: "insensitive" } },
                    { cpf_cnpj: { contains: search, mode: "insensitive" } },
                    { passaporte: { contains: search, mode: "insensitive" } },
                    { razao_social: { contains: search, mode: "insensitive" } },
                    { nome_fantasia: { contains: search, mode: "insensitive" } },
                    { ddi: { contains: search, mode: "insensitive" } },
                    { ddd: { contains: search, mode: "insensitive" } },
                    { telefone: { contains: search, mode: "insensitive" } },
                    { indicacao: { contains: search, mode: "insensitive" } },
                ],
            }
            : {};
        // Conta quantos registros existem no total
        const totalCount = await prisma_1.default.costumer.count({
            where: whereCondition,
        });
        // Calcula a última página
        const lastPage = Math.ceil(totalCount / perpage);
        // Busca os registros paginados
        const customers = await prisma_1.default.costumer.findMany({
            where: whereCondition,
            skip,
            take: perpage,
            select: {
                id_costumer: true,
                nome: true,
                email: true,
                cpf_cnpj: true,
                passaporte: true,
                razao_social: true,
                nome_fantasia: true,
                ddi: true,
                ddd: true,
                telefone: true,
                indicacao: true,
                created_at: true,
                updated_at: true,
            },
        });
        return {
            customers,
            page,
            perpage,
            lastPage,
            totalCount,
        };
    }
}
exports.ListCostumerService = ListCostumerService;
