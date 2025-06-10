import { Request, Response } from "express";
import { DeleteCostumerService } from "../../services/costumers/delete_costumer_service";
import { ServiceError } from "../../shared/erros";

class DeleteCostumerController {
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const deleteCostumerService = new DeleteCostumerService();
      await deleteCostumerService.execute(id);

      return res.status(200).json({
        message: "Cliente excluído com sucesso",
        status_code: 200,
      });
    } catch (error) {
      const publicErrorObject = new ServiceError({
        message: "Erro ao excluir costumer.",
        cause: error,
      });
      console.error(publicErrorObject);
      return res.status(publicErrorObject.statusCode).json(publicErrorObject);
    }
  }
}

export { DeleteCostumerController };
