"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCondicaoPagamentoService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CreateCondicaoPagamentoService {
    async execute({ description, installments, discount, }) {
        const condicaoPagamento = await prisma_1.default.condicao_Pagamento.create({
            data: {
                description,
                discount,
                installments,
            },
        });
        return condicaoPagamento;
    }
}
exports.CreateCondicaoPagamentoService = CreateCondicaoPagamentoService;
