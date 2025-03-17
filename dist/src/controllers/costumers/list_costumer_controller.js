"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCostumerController = void 0;
const list_costumer_service_1 = require("../../services/costumers/list_costumer_service");
const erros_1 = require("../../shared/erros");
class ListCostumerController {
    async handle(req, res) {
        try {
            const { search = "", page = "1", perpage = "10" } = req.query;
            const listCostumerService = new list_costumer_service_1.ListCostumerService();
            const result = await listCostumerService.execute({
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
                message: "Erro ao listar costumers.",
                cause: error,
            });
            console.error(publicErrorObject);
            return res.status(publicErrorObject.statusCode).json(publicErrorObject);
        }
    }
}
exports.ListCostumerController = ListCostumerController;
