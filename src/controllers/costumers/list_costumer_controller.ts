import { Request, Response } from "express";
import { ListCostumerService } from "../../services/costumers/list_costumer_service";
import { ServiceError } from "../../shared/erros";

class ListCostumerController {
  async handle(req: Request, res: Response) {
    try {
      const { search = "", page = "1", perpage = "10" } = req.query;

      const listCostumerService = new ListCostumerService();
      const result = await listCostumerService.execute({
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
        message: "Erro ao listar costumers.",
        cause: error,
      });
      console.error(publicErrorObject);
      return res.status(publicErrorObject.statusCode).json(publicErrorObject);
    }
  }
}

export { ListCostumerController };
