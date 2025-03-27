import { Request, Response } from "express";
import { GetOrderService } from "../../services/orders/get_orders_service";
import { ServiceError } from "../../shared/erros";

class GetOrderController {
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const getOrderService = new GetOrderService();

      const order = await getOrderService.execute(id);

      if (!order) {
        return res.status(404).json({
          message: "Order not found",
          status_code: 404,
        });
      }

      return res.status(200).json({
        order,
        status_code: 200,
      });
    } catch (error) {
      const publicErrorObject = new ServiceError({
        message: "Erro ao buscar Order.",
        cause: error,
      });
      console.error(publicErrorObject);
      return res.status(publicErrorObject.statusCode).json(publicErrorObject);
    }
  }
}

export { GetOrderController };
