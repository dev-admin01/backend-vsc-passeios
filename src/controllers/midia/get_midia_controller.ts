import { Request, Response } from "express";
import { GetMidiaService } from "../../services/midia";
import { ServiceError } from "../../shared/erros";

class GetMidiaController {
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const getMidiaService = new GetMidiaService();
      const midia = await getMidiaService.execute(Number(id));

      return res.status(200).json({
        message: "Mídia encontrada com sucesso",
        midia: midia,
        status_code: 200,
      });
    } catch (error) {
      const publicErrorObject = new ServiceError({
        message: "Erro ao buscar mídia.",
        cause: error,
      });
      console.error(publicErrorObject);
      return res.status(publicErrorObject.statusCode).json(publicErrorObject);
    }
  }
}

export { GetMidiaController };
