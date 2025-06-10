import { Request, Response } from "express";
import { GetCostumerService } from "../../services/costumers/get_costumer_service";
import { ServiceError } from "../../shared/erros";

class GetCostumerController {
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const getCostumerService = new GetCostumerService();
      const costumer = await getCostumerService.execute(id);

      if (!costumer) {
        return res.status(404).json({
          message: "Cliente não encontrado",
          status_code: 404,
        });
      }

      return res.status(200).json({
        costumer,
        status_code: 200,
      });
    } catch (error) {
      const publicErrorObject = new ServiceError({
        message: "Erro ao buscar costumer.",
        cause: error,
      });
      console.error(publicErrorObject);
      return res.status(publicErrorObject.statusCode).json(publicErrorObject);
    }
  }
}

export { GetCostumerController };
