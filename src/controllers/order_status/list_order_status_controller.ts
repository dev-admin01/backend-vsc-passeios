import { Request, Response } from "express";
import { ListOrderStatusService } from "../../services/order_status/list_order_status_service";
import { ServiceError } from "../../shared/erros";

class ListOrderStatusController {
  async handle(req: Request, res: Response) {
    try {
      const { search = "", page = "1", perpage = "10" } = req.query;

      const listOrderStatusService = new ListOrderStatusService();
      const result = await listOrderStatusService.execute({
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
        message: "Erro ao listar order status.",
        cause: error,
      });
      console.error(publicErrorObject);
      return res.status(publicErrorObject.statusCode).json(publicErrorObject);
    }
  }
}

export { ListOrderStatusController };
