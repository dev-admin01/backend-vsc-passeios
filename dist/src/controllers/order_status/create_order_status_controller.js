"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderStatusController = void 0;
const create_order_status_service_1 = require("../../services/order_status/create_order_status_service");
const erros_1 = require("../../shared/erros");
class CreateOrderStatusController {
    async handle(req, res) {
        try {
            const { description } = req.body;
            const createOrderStatusService = new create_order_status_service_1.CreateOrderStatusService();
            const orderStatus = await createOrderStatusService.execute({
                description,
            });
            return res.status(201).json({
                message: "Order status created successfully",
                status_order: orderStatus,
                status_code: 201,
            });
        }
        catch (error) {
            const publicErrorObject = new erros_1.ServiceError({
                message: "Erro ao criar order status.",
                cause: error,
            });
            console.error(publicErrorObject);
            return res.status(publicErrorObject.statusCode).json(publicErrorObject);
        }
    }
}
exports.CreateOrderStatusController = CreateOrderStatusController;
