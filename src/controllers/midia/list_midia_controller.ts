import { Request, Response } from "express";
import { ListMidiaService } from "../../services/midia";
import { ServiceError } from "../../shared/erros";

class ListMidiaController {
  async handle(req: Request, res: Response) {
    try {
      const listMidiaService = new ListMidiaService();
      const midias = await listMidiaService.execute();

      return res.status(200).json({
        message: "Mídias listadas com sucesso",
        midias: midias,
        status_code: 200,
      });
    } catch (error) {
      const publicErrorObject = new ServiceError({
        message: "Erro ao listar mídias.",
        cause: error,
      });
      console.error(publicErrorObject);
      return res.status(publicErrorObject.statusCode).json(publicErrorObject);
    }
  }
}

export { ListMidiaController };
