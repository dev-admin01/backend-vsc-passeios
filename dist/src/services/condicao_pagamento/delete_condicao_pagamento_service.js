"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCondicaoPagamentoService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class DeleteCondicaoPagamentoService {
    async execute(id_cond_pag) {
        await prisma_1.default.condicao_Pagamento.delete({
            where: {
                id_cond_pag,
            },
        });
    }
}
exports.DeleteCondicaoPagamentoService = DeleteCondicaoPagamentoService;
