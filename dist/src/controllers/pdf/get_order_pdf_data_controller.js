"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOrderPDFDataController = void 0;
const get_order_pdf_data_service_1 = require("../../services/pdf/get_order_pdf_data_service");
const erros_1 = require("../../shared/erros");
class GetOrderPDFDataController {
    async handle(req, res) {
        try {
            const { id } = req.params;
            const getOrderPDFDataService = new get_order_pdf_data_service_1.GetOrderPDFDataService();
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
        }
        catch (error) {
            const publicErrorObject = new erros_1.ServiceError({
                message: "Erro ao buscar Order PDF data.",
                cause: error,
            });
            console.error(publicErrorObject);
            return res.status(publicErrorObject.statusCode).json(publicErrorObject);
        }
    }
}
exports.GetOrderPDFDataController = GetOrderPDFDataController;
