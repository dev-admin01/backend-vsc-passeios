import { Request, Response } from "express";
import { CreateCondicaoPagamentoService } from "../../services/condicao_pagamento";
import { ServiceError } from "../../shared/erros";

class CreateCondicaoPagamentoController {
  async handle(req: Request, res: Response) {
    try {
      const { description, installments, discount } = req.body;
      const createCondicaoPagamentoService =
        new CreateCondicaoPagamentoService();
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
    } catch (error) {
      const publicErrorObject = new ServiceError({
        message: "Erro ao criar condição de pagamento.",
        cause: error,
      });
      console.error(publicErrorObject);
      return res.status(publicErrorObject.statusCode).json(publicErrorObject);
    }
  }
}

export { CreateCondicaoPagamentoController };
