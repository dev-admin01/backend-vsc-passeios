import { Request, Response } from "express";
import { GetOrderPDFDataService } from "../../services/pdf/get_order_pdf_data_service";
import { ServiceError } from "../../shared/erros";

class GetOrderPDFDataController {
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const getOrderPDFDataService = new GetOrderPDFDataService();

      const pdfData = await getOrderPDFDataService.execute(id);

      if (!pdfData) {
        return res.status(404).json({
          message: "Order not found",
          status_code: 404,
        });
      }

      return res.status(200).json({
        pdfData,
        status_code: 200,
        message: "Order PDF data fetched successfully",
      });
    } catch (error) {
      const publicErrorObject = new ServiceError({
        message: "Erro ao buscar Order PDF data.",
        cause: error,
      });
      console.error(publicErrorObject);
      return res.status(publicErrorObject.statusCode).json(publicErrorObject);
    }
  }
}

export { GetOrderPDFDataController };
