import { Request, Response } from "express";
import { UpdateServiceService } from "../../services/services/update_service_service";
import { ServiceError } from "../../shared/erros";

class UpdateServiceController {
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { description, type, price, observation, time } = req.body;

      const updateServiceService = new UpdateServiceService();
      const updatedService = await updateServiceService.execute({
        id_service: Number(id),
        description,
        type,
        price,
        time,
        observation,
      });

      return res.status(200).json({
        message: "Passeio Atualizado com sucesso!",
        service: updatedService,
        status_code: 200,
      });
    } catch (error) {
      const publicErrorObject = new ServiceError({
        message: "Erro ao atualizar o passeio.",
        cause: error,
      });
      console.error(publicErrorObject);
      res.status(publicErrorObject.statusCode).json(publicErrorObject);
    }
  }
}

export { UpdateServiceController };
