import { Request, Response } from "express";
import { UpdateOrderStatusService } from "../../services/order_status/update_order_status_service";
import { ServiceError } from "../../shared/erros";

class UpdateOrderStatusController {
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { description } = req.body;

      const updateOrderStatusService = new UpdateOrderStatusService();
      const updatedStatus = await updateOrderStatusService.execute({
        id_status_order: Number(id),
        description,
      });

      return res.status(200).json({
        message: "Order status updated successfully",
        orderStatus: updatedStatus,
        status_code: 200,
      });
    } catch (error) {
      const publicErrorObject = new ServiceError({
        message: "Erro ao atualizar order status.",
        cause: error,
      });
      console.error(publicErrorObject);
      return res.status(publicErrorObject.statusCode).json(publicErrorObject);
    }
  }
}

export { UpdateOrderStatusController };
