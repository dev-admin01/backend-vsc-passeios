"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOrderRegisterLinkController = void 0;
const get_order_register_link_service_1 = require("../../services/register_link/get_order_register_link_service");
const erros_1 = require("../../shared/erros");
class GetOrderRegisterLinkController {
    async handle(req, res) {
        try {
            const { id } = req.params;
            const getOrderRegisterLinkService = new get_order_register_link_service_1.GetOrderRegisterLinkService();
            const order = await getOrderRegisterLinkService.execute(id);
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
exports.GetOrderRegisterLinkController = GetOrderRegisterLinkController;
