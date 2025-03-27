"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteOrderStatusController = void 0;
const delete_order_status_service_1 = require("../../services/order_status/delete_order_status_service");
const erros_1 = require("../../shared/erros");
class DeleteOrderStatusController {
    async handle(req, res) {
        try {
            const { id } = req.params;
            const deleteOrderStatusService = new delete_order_status_service_1.DeleteOrderStatusService();
            await deleteOrderStatusService.execute(Number(id));
            return res.status(200).json({
                message: "Order status deleted successfully",
                status_code: 200,
            });
        }
        catch (error) {
            const publicErrorObject = new erros_1.ServiceError({
                message: "Erro ao excluir order status.",
                cause: error,
            });
            console.error(publicErrorObject);
            return res.status(publicErrorObject.statusCode).json(publicErrorObject);
        }
    }
}
exports.DeleteOrderStatusController = DeleteOrderStatusController;
