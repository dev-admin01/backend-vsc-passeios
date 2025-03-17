"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCostumerService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class UpdateCostumerService {
    async execute({ id_costumer, nome, cpf_cnpj, passaporte, razao_social, nome_fantasia, ddi, ddd, telefone, indicacao, }) {
        const updatedCostumer = await prisma_1.default.costumer.update({
            where: { id_costumer },
            data: {
                nome,
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
        return updatedCostumer;
    }
}
exports.UpdateCostumerService = UpdateCostumerService;
