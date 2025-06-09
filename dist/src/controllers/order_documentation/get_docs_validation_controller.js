"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDocsValidationController = void 0;
const get_docs_validation_service_1 = require("../../services/order_documentation/get_docs_validation_service");
const erros_1 = require("../../shared/erros");
class GetDocsValidationController {
    async handle(req, res) {
        try {
            const { id } = req.params;
            const getDocsValidationService = new get_docs_validation_service_1.GetDocsValidationService();
            const docsValidation = await getDocsValidationService.execute(id);
            if (docsValidation.length === 0) {
                return res.status(404).json({ message: "Nenhum documento encontrado" });
            }
            return res.status(200).json({
                docsValidation,
                status_code: 200,
            });
        }
        catch (error) {
            const publicErrorObject = new erros_1.ServiceError({
                message: "Erro ao buscar documentos de validação.",
                cause: error,
            });
            return res.status(publicErrorObject.statusCode).json(publicErrorObject);
        }
    }
}
exports.GetDocsValidationController = GetDocsValidationController;
