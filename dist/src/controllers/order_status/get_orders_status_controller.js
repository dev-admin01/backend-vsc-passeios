"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOrderStatusController = void 0;
const get_orders_status_service_1 = require("../../services/order_status/get_orders_status_service");
const erros_1 = require("../../shared/erros");
class GetOrderStatusController {
    async handle(req, res) {
        try {
            const { id } = req.params;
            const getOrderStatusService = new get_orders_status_service_1.GetOrderStatusService();
            const orderStatus = await getOrderStatusService.execute(Number(id));
            if (!orderStatus) {
                return res.status(404).json({
                    message: "Order status not found",
                    status_code: 404,
                });
            }
            return res.status(200).json({
                orderStatus,
                status_code: 200,
            });
        }
        catch (error) {
            const publicErrorObject = new erros_1.ServiceError({
                message: "Erro ao buscar order status.",
                cause: error,
            });
            console.error(publicErrorObject);
            return res.status(publicErrorObject.statusCode).json(publicErrorObject);
        }
    }
}
exports.GetOrderStatusController = GetOrderStatusController;
