import { Request, Response } from "express";
import { CreateServiceService } from "../../services/services/create_service_service";

import { ServiceError } from "../../shared/erros";

class CreateServiceController {
  async handle(req: Request, res: Response) {
    try {
      const { description, type, price, observation } = req.body;
      const serviceServ = new CreateServiceService();

      const service = await serviceServ.execute({
        description,
        type,
        price,
        observation,
      });

      return res.status(201).json({
        message: "Service created successfully",
        service,
        status_code: 201,
      });
    } catch (error) {
      const publicErrorObject = new ServiceError({
        message: "Erro na conexão com Banco ou na Query.",
        cause: error,
      });
      console.error(publicErrorObject);
      res.status(publicErrorObject.statusCode).json(publicErrorObject);
    }
  }
}

export { CreateServiceController };
