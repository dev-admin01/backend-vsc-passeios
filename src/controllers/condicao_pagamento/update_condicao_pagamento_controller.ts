import { Request, Response } from "express";
import { UpdateCondicaoPagamentoService } from "../../services/condicao_pagamento";
import { ServiceError } from "../../shared/erros";

class UpdateCondicaoPagamentoController {
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { description, installments, discount } = req.body;

      const updateCondicaoPagamentoService =
        new UpdateCondicaoPagamentoService();
      const condicaoPagamento = await updateCondicaoPagamentoService.execute(
        String(id),
        {
          description,
          installments,
          discount,
        },
      );

      return res.status(200).json({
        message: "Condição de pagamento atualizada com sucesso",
        condicaoPagamento: condicaoPagamento,
        status_code: 200,
      });
    } catch (error) {
      const publicErrorObject = new ServiceError({
        message: "Erro ao atualizar condição de pagamento.",
        cause: error,
      });
      console.error(publicErrorObject);
      return res.status(publicErrorObject.statusCode).json(publicErrorObject);
    }
  }
}

export { UpdateCondicaoPagamentoController };
