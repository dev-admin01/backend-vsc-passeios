"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCostumerService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class GetCostumerService {
    async execute(id_costumer) {
        const costumer = await prisma_1.default.costumer.findUnique({
            where: { id_costumer },
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
        return costumer;
    }
}
exports.GetCostumerService = GetCostumerService;
