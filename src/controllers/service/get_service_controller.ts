import { Request, Response } from "express";
import { GetServiceService } from "../../services/services/get_service_service";
import { ServiceError } from "../../shared/erros";

class GetServiceController {
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const getServiceService = new GetServiceService();
      const service = await getServiceService.execute({ id: Number(id) });

      if (!service) {
        return res.status(404).json({
          message: "Service not found",
          status_code: 404,
        });
      }

      return res.status(200).json({
        service,
        status_code: 200,
      });
    } catch (error) {
      const publicErrorObject = new ServiceError({
        message: "Erro ao buscar o serviço.",
        cause: error,
      });
      console.error(publicErrorObject);
      res.status(publicErrorObject.statusCode).json(publicErrorObject);
    }
  }
}

export { GetServiceController };
