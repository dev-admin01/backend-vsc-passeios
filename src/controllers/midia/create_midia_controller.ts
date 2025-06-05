import { Request, Response } from "express";
import { CreateMidiaService } from "../../services/midia";
import { ServiceError } from "../../shared/erros";

class CreateMidiaController {
  async handle(req: Request, res: Response) {
    try {
      const { description } = req.body;

      const createMidiaService = new CreateMidiaService();
      const midia = await createMidiaService.execute({
        description,
      });

      return res.status(201).json({
        message: "Mídia criada com sucesso",
        midia: midia,
        status_code: 201,
      });
    } catch (error) {
      const publicErrorObject = new ServiceError({
        message: "Erro ao criar mídia.",
        cause: error,
      });
      console.error(publicErrorObject);
      return res.status(publicErrorObject.statusCode).json(publicErrorObject);
    }
  }
}

export { CreateMidiaController };
