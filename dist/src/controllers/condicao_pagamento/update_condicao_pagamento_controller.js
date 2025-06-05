"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCondicaoPagamentoController = void 0;
const condicao_pagamento_1 = require("../../services/condicao_pagamento");
const erros_1 = require("../../shared/erros");
class UpdateCondicaoPagamentoController {
    async handle(req, res) {
        try {
            const { id } = req.params;
            const { description, installments, discount } = req.body;
            const updateCondicaoPagamentoService = new condicao_pagamento_1.UpdateCondicaoPagamentoService();
            const condicaoPagamento = await updateCondicaoPagamentoService.execute(String(id), {
                description,
                installments,
                discount,
            });
            return res.status(200).json({
                message: "Condição de pagamento atualizada com sucesso",
                condicaoPagamento: condicaoPagamento,
                status_code: 200,
            });
        }
        catch (error) {
            const publicErrorObject = new erros_1.ServiceError({
                message: "Erro ao atualizar condição de pagamento.",
                cause: error,
            });
            console.error(publicErrorObject);
            return res.status(publicErrorObject.statusCode).json(publicErrorObject);
        }
    }
}
exports.UpdateCondicaoPagamentoController = UpdateCondicaoPagamentoController;
