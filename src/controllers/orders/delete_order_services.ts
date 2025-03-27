import { Request, Response } from "express";
import { DeleteOrderService } from "../../services/orders/delete_orders_service";
import { ServiceError } from "../../shared/erros";

class DeleteOrderController {
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const deleteOrderService = new DeleteOrderService();
      await deleteOrderService.execute(id);

      return res.status(200).json({
        message: "Order deleted successfully",
        status_code: 200,
      });
    } catch (error) {
      const publicErrorObject = new ServiceError({
        message: "Erro ao excluir Order.",
        cause: error,
      });
      console.error(publicErrorObject);
      return res.status(publicErrorObject.statusCode).json(publicErrorObject);
    }
  }
}

export { DeleteOrderController };
