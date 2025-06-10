"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCostumerController = void 0;
const delete_costumer_service_1 = require("../../services/costumers/delete_costumer_service");
const erros_1 = require("../../shared/erros");
class DeleteCostumerController {
    async handle(req, res) {
        try {
            const { id } = req.params;
            const deleteCostumerService = new delete_costumer_service_1.DeleteCostumerService();
            await deleteCostumerService.execute(id);
            return res.status(200).json({
                message: "Cliente excluído com sucesso",
                status_code: 200,
            });
        }
        catch (error) {
            const publicErrorObject = new erros_1.ServiceError({
                message: "Erro ao excluir costumer.",
                cause: error,
            });
            console.error(publicErrorObject);
            return res.status(publicErrorObject.statusCode).json(publicErrorObject);
        }
    }
}
exports.DeleteCostumerController = DeleteCostumerController;
