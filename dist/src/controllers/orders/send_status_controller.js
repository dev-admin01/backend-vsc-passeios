"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendStatusOrderController = void 0;
const send_status_service_1 = require("../../services/orders/send_status_service");
const erros_1 = require("../../shared/erros");
class SendStatusOrderController {
    async handle(req, res) {
        try {
            const { id_order, id_status_order } = req.body;
            const id_user = req.id_user;
            const updateOrderService = new send_status_service_1.SendStatusService();
            await updateOrderService.execute({
                id_order,
                id_user,
                id_status_order,
            });
            return res.status(200).json({
                message: "Status atualizado com sucesso",
                status_code: 200,
            });
        }
        catch (error) {
            const publicErrorObject = new erros_1.ServiceError({
                message: "Erro ao atualizar status.",
                cause: error,
            });
            console.error(publicErrorObject);
            return res.status(publicErrorObject.statusCode).json(publicErrorObject);
        }
    }
}
exports.SendStatusOrderController = SendStatusOrderController;
