import { Request, Response } from "express";
import { GetOrderRegisterLinkService } from "../../services/register_link/get_order_register_link_service";
import { ServiceError } from "../../shared/erros";

class GetOrderRegisterLinkController {
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const getOrderRegisterLinkService = new GetOrderRegisterLinkService();

      const order = await getOrderRegisterLinkService.execute(id);

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

export { GetOrderRegisterLinkController };
