"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCondicaoPagamentoService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class GetCondicaoPagamentoService {
    async execute(id_cond_pag) {
        const condicaoPagamento = await prisma_1.default.condicao_Pagamento.findUnique({
            where: {
                id_cond_pag,
            },
        });
        if (!condicaoPagamento) {
            throw new Error("Condição de pagamento não encontrada");
        }
        return condicaoPagamento;
    }
}
exports.GetCondicaoPagamentoService = GetCondicaoPagamentoService;
