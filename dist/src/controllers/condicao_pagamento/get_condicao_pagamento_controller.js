"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCondicaoPagamentoController = void 0;
const condicao_pagamento_1 = require("../../services/condicao_pagamento");
const erros_1 = require("../../shared/erros");
class GetCondicaoPagamentoController {
    async handle(req, res) {
        try {
            const { id } = req.params;
            const getCondicaoPagamentoService = new condicao_pagamento_1.GetCondicaoPagamentoService();
            const condicaoPagamento = await getCondicaoPagamentoService.execute(id);
            return res.status(200).json({
                message: "Condição de pagamento encontrada com sucesso",
                condicaoPagamento: condicaoPagamento,
                status_code: 200,
            });
        }
        catch (error) {
            const publicErrorObject = new erros_1.ServiceError({
                message: "Erro ao buscar condição de pagamento.",
                cause: error,
            });
            console.error(publicErrorObject);
            return res.status(publicErrorObject.statusCode).json(publicErrorObject);
        }
    }
}
exports.GetCondicaoPagamentoController = GetCondicaoPagamentoController;
