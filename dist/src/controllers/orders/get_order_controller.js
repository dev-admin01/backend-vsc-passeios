"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOrderController = void 0;
const get_orders_service_1 = require("../../services/orders/get_orders_service");
const erros_1 = require("../../shared/erros");
class GetOrderController {
    async handle(req, res) {
        try {
            const { id } = req.params;
            const getOrderService = new get_orders_service_1.GetOrderService();
            const order = await getOrderService.execute(id);
            if (!order) {
                return res.status(404).json({
                    message: "Order not found",
                    status_code: 404,
                });
            }
            return res.status(200).json({
                order,
                status_code: 200,
            });
        }
        catch (error) {
            const publicErrorObject = new erros_1.ServiceError({
                message: "Erro ao buscar Order.",
                cause: error,
            });
            console.error(publicErrorObject);
            return res.status(publicErrorObject.statusCode).json(publicErrorObject);
        }
    }
}
exports.GetOrderController = GetOrderController;
