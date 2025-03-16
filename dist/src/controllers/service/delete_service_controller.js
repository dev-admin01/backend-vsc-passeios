"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteServiceController = void 0;
const delete_services_service_1 = require("../../services/services/delete_services_service");
const erros_1 = require("../../shared/erros");
class DeleteServiceController {
    async handle(req, res) {
        try {
            const { id } = req.params;
            const deleteServiceService = new delete_services_service_1.DeleteServiceService();
            await deleteServiceService.execute({ id: Number(id) });
            return res.status(200).json({
                message: "Service deleted successfully",
                status_code: 200,
            });
        }
        catch (error) {
            const publicErrorObject = new erros_1.ServiceError({
                message: "Erro ao excluir o serviço.",
                cause: error,
            });
            console.error(publicErrorObject);
            res.status(publicErrorObject.statusCode).json(publicErrorObject);
        }
    }
}
exports.DeleteServiceController = DeleteServiceController;
