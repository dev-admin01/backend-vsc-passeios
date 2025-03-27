"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListOrderStatusController = void 0;
const list_order_status_service_1 = require("../../services/order_status/list_order_status_service");
const erros_1 = require("../../shared/erros");
class ListOrderStatusController {
    async handle(req, res) {
        try {
            const { search = "", page = "1", perpage = "10" } = req.query;
            const listOrderStatusService = new list_order_status_service_1.ListOrderStatusService();
            const result = await listOrderStatusService.execute({
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
                message: "Erro ao listar order status.",
                cause: error,
            });
            console.error(publicErrorObject);
            return res.status(publicErrorObject.statusCode).json(publicErrorObject);
        }
    }
}
exports.ListOrderStatusController = ListOrderStatusController;
