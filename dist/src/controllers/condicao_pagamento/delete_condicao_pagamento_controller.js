"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCondicaoPagamentoController = void 0;
const condicao_pagamento_1 = require("../../services/condicao_pagamento");
const erros_1 = require("../../shared/erros");
class DeleteCondicaoPagamentoController {
    async handle(req, res) {
        try {
            const { id } = req.params;
            const deleteCondicaoPagamentoService = new condicao_pagamento_1.DeleteCondicaoPagamentoService();
            await deleteCondicaoPagamentoService.execute(id);
            return res.status(200).json({
                message: "Condição de pagamento excluída com sucesso",
                status_code: 200,
            });
        }
        catch (error) {
            const publicErrorObject = new erros_1.ServiceError({
                message: "Erro ao excluir condição de pagamento.",
                cause: error,
            });
            console.error(publicErrorObject);
            return res.status(publicErrorObject.statusCode).json(publicErrorObject);
        }
    }
}
exports.DeleteCondicaoPagamentoController = DeleteCondicaoPagamentoController;
