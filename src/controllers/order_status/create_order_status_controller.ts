import { Request, Response } from "express";
import { CreateOrderStatusService } from "../../services/order_status/create_order_status_service";
import { ServiceError } from "../../shared/erros";

class CreateOrderStatusController {
  async handle(req: Request, res: Response) {
    try {
      const { description } = req.body;

      const createOrderStatusService = new CreateOrderStatusService();
      const orderStatus = await createOrderStatusService.execute({
        description,
      });

      return res.status(201).json({
        message: "Order status created successfully",
        status_order: orderStatus,
        status_code: 201,
      });
    } catch (error) {
      const publicErrorObject = new ServiceError({
        message: "Erro ao criar order status.",
        cause: error,
      });
      console.error(publicErrorObject);
      return res.status(publicErrorObject.statusCode).json(publicErrorObject);
    }
  }
}

export { CreateOrderStatusController };
