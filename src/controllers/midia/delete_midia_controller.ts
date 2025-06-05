import { Request, Response } from "express";
import { DeleteMidiaService } from "../../services/midia";
import { ServiceError } from "../../shared/erros";

class DeleteMidiaController {
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const deleteMidiaService = new DeleteMidiaService();
      await deleteMidiaService.execute(Number(id));

      return res.status(200).json({
        message: "Mídia excluída com sucesso",
        status_code: 200,
      });
    } catch (error) {
      const publicErrorObject = new ServiceError({
        message: "Erro ao excluir mídia.",
        cause: error,
      });
      console.error(publicErrorObject);
      return res.status(publicErrorObject.statusCode).json(publicErrorObject);
    }
  }
}

export { DeleteMidiaController };
