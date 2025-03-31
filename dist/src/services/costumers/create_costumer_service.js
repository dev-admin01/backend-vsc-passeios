"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCostumerService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CreateCostumerService {
    async execute({ nome, email, cpf_cnpj, passaporte, razao_social, nome_fantasia, ddi, ddd, telefone, indicacao, }) {
        const costumer = await prisma_1.default.costumer.create({
            data: {
                nome,
                email,
                cpf_cnpj,
                passaporte,
                razao_social,
                nome_fantasia,
                ddi,
                ddd,
                telefone,
                indicacao,
            },
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
exports.CreateCostumerService = CreateCostumerService;
