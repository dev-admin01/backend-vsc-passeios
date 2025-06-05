"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderController = void 0;
const create_orders_service_1 = require("../../services/orders/create_orders_service");
const erros_1 = require("../../shared/erros");
class CreateOrderController {
    async handle(req, res) {
        try {
            const { id_user, price, services, pre_name, pre_email, pre_ddi, pre_ddd, pre_phone, id_cond_pag, id_coupons, } = req.body;
            const createOrderService = new create_orders_service_1.CreateOrderService();
            const order = await createOrderService.execute({
                id_user,
                price,
                services,
                pre_name,
                pre_email,
                pre_ddi,
                pre_ddd,
                pre_phone,
                id_cond_pag,
                id_coupons,
            });
            return res.status(201).json({
                message: `Orçamento ${order.order_number} criado com sucesso!`,
                order,
                status_code: 201,
            });
        }
        catch (error) {
            const publicErrorObject = new erros_1.ServiceError({
                message: "Erro ao criar Order.",
                cause: error,
            });
            console.error(publicErrorObject);
            return res.status(publicErrorObject.statusCode).json(publicErrorObject);
        }
    }
}
exports.CreateOrderController = CreateOrderController;
