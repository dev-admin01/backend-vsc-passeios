"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCondicaoPagamentoController = void 0;
const condicao_pagamento_1 = require("../../services/condicao_pagamento");
const erros_1 = require("../../shared/erros");
class CreateCondicaoPagamentoController {
    async handle(req, res) {
        try {
            const { description, installments, discount } = req.body;
            const createCondicaoPagamentoService = new condicao_pagamento_1.CreateCondicaoPagamentoService();
            const condicaoPagamento = await createCondicaoPagamentoService.execute({
                description,
                installments,
                discount,
            });
            return res.status(201).json({
                message: "Condição de pagamento criada com sucesso",
                condicaoPagamento: condicaoPagamento,
                status_code: 201,
            });
        }
        catch (error) {
            const publicErrorObject = new erros_1.ServiceError({
                message: "Erro ao criar condição de pagamento.",
                cause: error,
            });
            console.error(publicErrorObject);
            return res.status(publicErrorObject.statusCode).json(publicErrorObject);
        }
    }
}
exports.CreateCondicaoPagamentoController = CreateCondicaoPagamentoController;
