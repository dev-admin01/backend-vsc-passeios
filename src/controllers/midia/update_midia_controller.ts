import { Request, Response } from "express";
import { UpdateMidiaService } from "../../services/midia";
import { ServiceError } from "../../shared/erros";

class UpdateMidiaController {
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { description } = req.body;

      const updateMidiaService = new UpdateMidiaService();
      const midia = await updateMidiaService.execute(Number(id), {
        description,
      });

      return res.status(200).json({
        message: "Mídia atualizada com sucesso",
        midia: midia,
        status_code: 200,
      });
    } catch (error) {
      const publicErrorObject = new ServiceError({
        message: "Erro ao atualizar mídia.",
        cause: error,
      });
      console.error(publicErrorObject);
      return res.status(publicErrorObject.statusCode).json(publicErrorObject);
    }
  }
}

export { UpdateMidiaController };
