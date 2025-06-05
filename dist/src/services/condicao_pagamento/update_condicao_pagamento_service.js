"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCondicaoPagamentoService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class UpdateCondicaoPagamentoService {
    async execute(id_cond_pag, { description, installments, discount }) {
        const condicaoPagamento = await prisma_1.default.condicao_Pagamento.update({
            where: {
                id_cond_pag,
            },
            data: {
                description,
                installments,
                discount,
            },
        });
        return condicaoPagamento;
    }
}
exports.UpdateCondicaoPagamentoService = UpdateCondicaoPagamentoService;
