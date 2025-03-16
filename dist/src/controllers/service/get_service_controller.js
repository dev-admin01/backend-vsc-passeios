"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetServiceController = void 0;
const get_service_service_1 = require("../../services/services/get_service_service");
const erros_1 = require("../../shared/erros");
class GetServiceController {
    async handle(req, res) {
        try {
            const { id } = req.params;
            const getServiceService = new get_service_service_1.GetServiceService();
            const service = await getServiceService.execute({ id: Number(id) });
            if (!service) {
                return res.status(404).json({
                    message: "Service not found",
                    status_code: 404,
                });
            }
            return res.status(200).json({
                service,
                status_code: 200,
            });
        }
        catch (error) {
            const publicErrorObject = new erros_1.ServiceError({
                message: "Erro ao buscar o serviço.",
                cause: error,
            });
            console.error(publicErrorObject);
            res.status(publicErrorObject.statusCode).json(publicErrorObject);
        }
    }
}
exports.GetServiceController = GetServiceController;
