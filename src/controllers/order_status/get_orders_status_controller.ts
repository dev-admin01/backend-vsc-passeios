import { Request, Response } from "express";
import { GetOrderStatusService } from "../../services/order_status/get_orders_status_service";
import { ServiceError } from "../../shared/erros";

class GetOrderStatusController {
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const getOrderStatusService = new GetOrderStatusService();
      const orderStatus = await getOrderStatusService.execute(Number(id));

      if (!orderStatus) {
        return res.status(404).json({
          message: "Order status not found",
          status_code: 404,
        });
      }

      return res.status(200).json({
        orderStatus,
        status_code: 200,
      });
    } catch (error) {
      const publicErrorObject = new ServiceError({
        message: "Erro ao buscar order status.",
        cause: error,
      });
      console.error(publicErrorObject);
      return res.status(publicErrorObject.statusCode).json(publicErrorObject);
    }
  }
}

export { GetOrderStatusController };
