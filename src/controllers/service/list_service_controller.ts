import { Request, Response } from "express";
import { ListServiceService } from "../../services/services/list_service_service";

import { ServiceError } from "../../shared/erros";

class ListServiceController {
  async handle(req: Request, res: Response) {
    try {
      const { search = "", page = "1", perpage = "10" } = req.query;

      // Converte page e perpage para number
      const pageNumber = Number(page) || 1;
      const perpageNumber = Number(perpage) || 10;

      // Instancia o service
      const listService = new ListServiceService();

      // Chama o método execute
      const result = await listService.execute({
        search: String(search),
        page: pageNumber,
        perpage: perpageNumber,
      });

      // Retorna a resposta
      return res.status(200).json({
        ...result,
        status_code: 200,
      });
    } catch (error) {
      const publicErrorObject = new ServiceError({
        message: "Erro na conexão com Banco ou na Query.",
        cause: error,
      });
      console.error(publicErrorObject);
      res.status(publicErrorObject.statusCode).json(publicErrorObject);
    }
  }
}

export { ListServiceController };
