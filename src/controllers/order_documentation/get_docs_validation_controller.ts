import { Request, Response } from "express";
import { GetDocsValidationService } from "../../services/order_documentation/get_docs_validation_service";
import { ServiceError } from "../../shared/erros";

class GetDocsValidationController {
  async handle(req: Request, res: Response) {
    try {
      const { orderId } = req.params;

      const getDocsValidationService = new GetDocsValidationService();

      const docsValidation = await getDocsValidationService.execute(orderId);

      if (docsValidation.length === 0) {
        return res.status(404).json({ message: "Nenhum documento encontrado" });
      }

      return res.status(200).json({
        docsValidation,
        status_code: 200,
      });
    } catch (error) {
      const publicErrorObject = new ServiceError({
        message: "Erro ao buscar documentos de validação.",
        cause: error,
      });
      return res.status(publicErrorObject.statusCode).json(publicErrorObject);
    }
  }
}

export { GetDocsValidationController };
