"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyStatusController = void 0;
const verify_status_service_1 = require("../../services/status/verify_status_service");
const erros_1 = require("../../shared/erros");
class VerifyStatusController {
    async handle(req, res) {
        try {
            const statusService = new verify_status_service_1.VerifyStatusService();
            const status = await statusService.execute();
            return res.status(200).json({
                status,
            });
        }
        catch (error) {
            const publicErrorObject = new erros_1.ServiceError({
                message: "Erro na conexão com Banco ou na Query.",
                cause: error,
            });
            console.error(publicErrorObject);
            return res.status(publicErrorObject.statusCode).json(publicErrorObject);
        }
    }
}
exports.VerifyStatusController = VerifyStatusController;
