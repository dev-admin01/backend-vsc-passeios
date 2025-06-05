"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrderController = void 0;
const update_order_services_1 = require("../../services/orders/update_order_services");
const erros_1 = require("../../shared/erros");
class UpdateOrderController {
    async handle(req, res) {
        try {
            const { id } = req.params;
            const { id_user, id_costumer, price, id_status_order, services, pre_name, pre_email, pre_ddi, pre_ddd, pre_phone, id_cond_pag, } = req.body;
            const updateOrderService = new update_order_services_1.UpdateOrderService();
            const updatedOrder = await updateOrderService.execute({
                id_order: id,
                id_user,
                id_costumer,
                price,
                id_status_order,
                services,
                pre_name,
                pre_email,
                pre_ddi,
                pre_ddd,
                pre_phone,
                id_cond_pag,
            });
            return res.status(200).json({
                message: "Order updated successfully",
                order: updatedOrder,
                status_code: 200,
            });
        }
        catch (error) {
            const publicErrorObject = new erros_1.ServiceError({
                message: "Erro ao atualizar Order.",
                cause: error,
            });
            console.error(publicErrorObject);
            return res.status(publicErrorObject.statusCode).json(publicErrorObject);
        }
    }
}
exports.UpdateOrderController = UpdateOrderController;
