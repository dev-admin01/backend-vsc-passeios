"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCostumerController = void 0;
const get_costumer_service_1 = require("../../services/costumers/get_costumer_service");
const erros_1 = require("../../shared/erros");
class GetCostumerController {
    async handle(req, res) {
        try {
            const { id } = req.params;
            const getCostumerService = new get_costumer_service_1.GetCostumerService();
            const costumer = await getCostumerService.execute(id);
            if (!costumer) {
                return res.status(404).json({
                    message: "Cliente não encontrado",
                    status_code: 404,
                });
            }
            return res.status(200).json({
                costumer,
                status_code: 200,
            });
        }
        catch (error) {
            const publicErrorObject = new erros_1.ServiceError({
                message: "Erro ao buscar costumer.",
                cause: error,
            });
            console.error(publicErrorObject);
            return res.status(publicErrorObject.statusCode).json(publicErrorObject);
        }
    }
}
exports.GetCostumerController = GetCostumerController;
