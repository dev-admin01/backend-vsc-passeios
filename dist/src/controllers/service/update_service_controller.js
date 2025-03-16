"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateServiceController = void 0;
const update_service_service_1 = require("../../services/services/update_service_service");
const erros_1 = require("../../shared/erros");
class UpdateServiceController {
    async handle(req, res) {
        try {
            const { id } = req.params;
            const { description, type, price, observation } = req.body;
            const updateServiceService = new update_service_service_1.UpdateServiceService();
            const updatedService = await updateServiceService.execute({
                id: Number(id),
                description,
                type,
                price,
                observation,
            });
            return res.status(200).json({
                message: "Service updated successfully",
                service: updatedService,
                status_code: 200,
            });
        }
        catch (error) {
            const publicErrorObject = new erros_1.ServiceError({
                message: "Erro ao atualizar o serviço.",
                cause: error,
            });
            console.error(publicErrorObject);
            res.status(publicErrorObject.statusCode).json(publicErrorObject);
        }
    }
}
exports.UpdateServiceController = UpdateServiceController;
