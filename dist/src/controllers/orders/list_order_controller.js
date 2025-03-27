"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListOrderController = void 0;
const list_orders_service_1 = require("../../services/orders/list_orders_service");
const erros_1 = require("../../shared/erros");
class ListOrderController {
    async handle(req, res) {
        try {
            const { search = "", page = "1", perpage = "10" } = req.query;
            const listOrderService = new list_orders_service_1.ListOrderService();
            const result = await listOrderService.execute({
                search: String(search),
                page: Number(page),
                perpage: Number(perpage),
            });
            return res.status(200).json({
                ...result,
                status_code: 200,
            });
        }
        catch (error) {
            const publicErrorObject = new erros_1.ServiceError({
                message: "Erro ao listar Orders.",
                cause: error,
            });
            console.error(publicErrorObject);
            return res.status(publicErrorObject.statusCode).json(publicErrorObject);
        }
    }
}
exports.ListOrderController = ListOrderController;
