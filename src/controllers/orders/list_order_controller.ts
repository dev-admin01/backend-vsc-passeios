import { Request, Response } from "express";
import { ListOrderService } from "../../services/orders/list_orders_service";
import { ServiceError } from "../../shared/erros";

class ListOrderController {
  async handle(req: Request, res: Response) {
    try {
      const { search = "", page = "1", perpage = "10" } = req.query;
      const listOrderService = new ListOrderService();

      const result = await listOrderService.execute({
        search: String(search),
        page: Number(page),
        perpage: Number(perpage),
      });

      return res.status(200).json({
        ...result,
        status_code: 200,
      });
    } catch (error) {
      const publicErrorObject = new ServiceError({
        message: "Erro ao listar Orders.",
        cause: error,
      });
      console.error(publicErrorObject);
      return res.status(publicErrorObject.statusCode).json(publicErrorObject);
    }
  }
}

export { ListOrderController };
