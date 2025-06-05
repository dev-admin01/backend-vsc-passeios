import { Request, Response } from "express";
import { DeleteCondicaoPagamentoService } from "../../services/condicao_pagamento";
import { ServiceError } from "../../shared/erros";

class DeleteCondicaoPagamentoController {
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const deleteCondicaoPagamentoService =
        new DeleteCondicaoPagamentoService();
      await deleteCondicaoPagamentoService.execute(id);

      return res.status(200).json({
        message: "Condição de pagamento excluída com sucesso",
        status_code: 200,
      });
    } catch (error) {
      const publicErrorObject = new ServiceError({
        message: "Erro ao excluir condição de pagamento.",
        cause: error,
      });
      console.error(publicErrorObject);
      return res.status(publicErrorObject.statusCode).json(publicErrorObject);
    }
  }
}

export { DeleteCondicaoPagamentoController };
