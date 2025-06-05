import { Request, Response } from "express";
import { ListCondicaoPagamentoService } from "../../services/condicao_pagamento";
import { ServiceError } from "../../shared/erros";

class ListCondicaoPagamentoController {
  async handle(req: Request, res: Response) {
    try {
      const { search = "", page = "1", perpage = "10" } = req.query;

      const listCondicaoPagamentoService = new ListCondicaoPagamentoService();
      const result = await listCondicaoPagamentoService.execute({
        search: String(search),
        page: Number(page),
        perpage: Number(perpage),
      });

      return res.status(200).json({
        ...result,
        status_code: 200,
      });
    } catch (error) {
      const publicErrorObject = new ServiceError({
        message: "Erro ao listar condições de pagamento.",
        cause: error,
      });
      console.error(publicErrorObject);
      return res.status(publicErrorObject.statusCode).json(publicErrorObject);
    }
  }
}

export { ListCondicaoPagamentoController };
