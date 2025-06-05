"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCondicaoPagamentoController = void 0;
const condicao_pagamento_1 = require("../../services/condicao_pagamento");
const erros_1 = require("../../shared/erros");
class ListCondicaoPagamentoController {
    async handle(req, res) {
        try {
            const { search = "", page = "1", perpage = "10" } = req.query;
            const listCondicaoPagamentoService = new condicao_pagamento_1.ListCondicaoPagamentoService();
            const result = await listCondicaoPagamentoService.execute({
                search: String(search),
                page: Number(page),
                perpage: Number(perpage),
            });
            return res.status(200).json({
                ...result,
                status_code: 200,
            });
        }
        catch (error) {
            const publicErrorObject = new erros_1.ServiceError({
                message: "Erro ao listar condições de pagamento.",
                cause: error,
            });
            console.error(publicErrorObject);
            return res.status(publicErrorObject.statusCode).json(publicErrorObject);
        }
    }
}
exports.ListCondicaoPagamentoController = ListCondicaoPagamentoController;
