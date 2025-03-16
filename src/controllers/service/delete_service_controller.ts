import { Request, Response } from "express";
import { DeleteServiceService } from "../../services/services/delete_services_service";
import { ServiceError } from "../../shared/erros";

class DeleteServiceController {
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleteServiceService = new DeleteServiceService();
      await deleteServiceService.execute({ id: Number(id) });

      return res.status(200).json({
        message: "Service deleted successfully",
        status_code: 200,
      });
    } catch (error) {
      const publicErrorObject = new ServiceError({
        message: "Erro ao excluir o serviço.",
        cause: error,
      });
      console.error(publicErrorObject);
      res.status(publicErrorObject.statusCode).json(publicErrorObject);
    }
  }
}

export { DeleteServiceController };
