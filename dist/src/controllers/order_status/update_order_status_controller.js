"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrderStatusController = void 0;
const update_order_status_service_1 = require("../../services/order_status/update_order_status_service");
const erros_1 = require("../../shared/erros");
class UpdateOrderStatusController {
    async handle(req, res) {
        try {
            const { id } = req.params;
            const { description } = req.body;
            const updateOrderStatusService = new update_order_status_service_1.UpdateOrderStatusService();
            const updatedStatus = await updateOrderStatusService.execute({
                id_status_order: Number(id),
                description,
            });
            return res.status(200).json({
                message: "Order status updated successfully",
                orderStatus: updatedStatus,
                status_code: 200,
            });
        }
        catch (error) {
            const publicErrorObject = new erros_1.ServiceError({
                message: "Erro ao atualizar order status.",
                cause: error,
            });
            console.error(publicErrorObject);
            return res.status(publicErrorObject.statusCode).json(publicErrorObject);
        }
    }
}
exports.UpdateOrderStatusController = UpdateOrderStatusController;
