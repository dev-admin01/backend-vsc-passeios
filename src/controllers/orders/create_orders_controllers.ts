// src/controllers/orders/CreateOrderController.ts
import { Request, Response } from "express";
import { CreateOrderService } from "../../services/orders/create_orders_service";
import { ServiceError } from "../../shared/erros";

class CreateOrderController {
  async handle(req: Request, res: Response) {
    try {
      const {
        id_user,
        price,
        services,
        pre_name,
        pre_email,
        pre_ddi,
        pre_ddd,
        pre_phone,
      } = req.body;

      const createOrderService = new CreateOrderService();
      const order = await createOrderService.execute({
        id_user,
        price,
        services,
        pre_name,
        pre_email,
        pre_ddi,
        pre_ddd,
        pre_phone,
      });

      return res.status(201).json({
        message: "Order created successfully",
        order,
        status_code: 201,
      });
    } catch (error) {
      const publicErrorObject = new ServiceError({
        message: "Erro ao criar Order.",
        cause: error,
      });
      console.error(publicErrorObject);
      return res.status(publicErrorObject.statusCode).json(publicErrorObject);
    }
  }
}

export { CreateOrderController };
