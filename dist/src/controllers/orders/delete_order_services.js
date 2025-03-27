"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteOrderController = void 0;
const delete_orders_service_1 = require("../../services/orders/delete_orders_service");
const erros_1 = require("../../shared/erros");
class DeleteOrderController {
    async handle(req, res) {
        try {
            const { id } = req.params;
            const deleteOrderService = new delete_orders_service_1.DeleteOrderService();
            await deleteOrderService.execute(id);
            return res.status(200).json({
                message: "Order deleted successfully",
                status_code: 200,
            });
        }
        catch (error) {
            const publicErrorObject = new erros_1.ServiceError({
                message: "Erro ao excluir Order.",
                cause: error,
            });
            console.error(publicErrorObject);
            return res.status(publicErrorObject.statusCode).json(publicErrorObject);
        }
    }
}
exports.DeleteOrderController = DeleteOrderController;
