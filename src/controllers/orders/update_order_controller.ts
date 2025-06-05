import { Request, Response } from "express";
import { UpdateOrderService } from "../../services/orders/update_order_services";
import { ServiceError } from "../../shared/erros";

class UpdateOrderController {
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const {
        id_user,
        id_costumer,
        price,
        id_status_order,
        services,
        pre_name,
        pre_email,
        pre_ddi,
        pre_ddd,
        pre_phone,
        id_cond_pag,
      } = req.body;

      const updateOrderService = new UpdateOrderService();
      const updatedOrder = await updateOrderService.execute({
        id_order: id,
        id_user,
        id_costumer,
        price,
        id_status_order,
        services,
        pre_name,
        pre_email,
        pre_ddi,
        pre_ddd,
        pre_phone,
        id_cond_pag,
      });

      return res.status(200).json({
        message: "Order updated successfully",
        order: updatedOrder,
        status_code: 200,
      });
    } catch (error) {
      const publicErrorObject = new ServiceError({
        message: "Erro ao atualizar Order.",
        cause: error,
      });
      console.error(publicErrorObject);
      return res.status(publicErrorObject.statusCode).json(publicErrorObject);
    }
  }
}

export { UpdateOrderController };
