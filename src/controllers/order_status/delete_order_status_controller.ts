import { Request, Response } from "express";
import { DeleteOrderStatusService } from "../../services/order_status/delete_order_status_service";
import { ServiceError } from "../../shared/erros";

class DeleteOrderStatusController {
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const deleteOrderStatusService = new DeleteOrderStatusService();
      await deleteOrderStatusService.execute(Number(id));

      return res.status(200).json({
        message: "Order status deleted successfully",
        status_code: 200,
      });
    } catch (error) {
      const publicErrorObject = new ServiceError({
        message: "Erro ao excluir order status.",
        cause: error,
      });
      console.error(publicErrorObject);
      return res.status(publicErrorObject.statusCode).json(publicErrorObject);
    }
  }
}

export { DeleteOrderStatusController };
