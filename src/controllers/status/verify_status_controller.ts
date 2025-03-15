import { Request, Response } from "express";
import { VerifyStatusService } from "../../services/status/verify_status_service";
import { ServiceError } from "../../shared/erros";

class VerifyStatusController {
  async handle(req: Request, res: Response) {
    try {
      const statusService = new VerifyStatusService();
      const status = await statusService.execute();

      return res.status(200).json({
        status,
      });
    } catch (error) {
      const publicErrorObject = new ServiceError({
        message: "Erro na conexão com Banco ou na Query.",
        cause: error,
      });
      console.error(publicErrorObject);
      return res.status(publicErrorObject.statusCode).json(publicErrorObject);
    }
  }
}

export { VerifyStatusController };
