import { Request, Response } from "express";
import { GetCondicaoPagamentoService } from "../../services/condicao_pagamento";
import { ServiceError } from "../../shared/erros";

class GetCondicaoPagamentoController {
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const getCondicaoPagamentoService = new GetCondicaoPagamentoService();
      const condicaoPagamento = await getCondicaoPagamentoService.execute(id);

      return res.status(200).json({
        message: "Condição de pagamento encontrada com sucesso",
        condicaoPagamento: condicaoPagamento,
        status_code: 200,
      });
    } catch (error) {
      const publicErrorObject = new ServiceError({
        message: "Erro ao buscar condição de pagamento.",
        cause: error,
      });
      console.error(publicErrorObject);
      return res.status(publicErrorObject.statusCode).json(publicErrorObject);
    }
  }
}

export { GetCondicaoPagamentoController };
