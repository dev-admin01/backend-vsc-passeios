"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListServiceController = void 0;
const list_service_service_1 = require("../../services/services/list_service_service");
const erros_1 = require("../../shared/erros");
class ListServiceController {
    async handle(req, res) {
        try {
            const { search = "", page = "1", perpage = "10" } = req.query;
            // Converte page e perpage para number
            const pageNumber = Number(page) || 1;
            const perpageNumber = Number(perpage) || 10;
            // Instancia o service
            const listService = new list_service_service_1.ListServiceService();
            // Chama o método execute
            const result = await listService.execute({
                search: String(search),
                page: pageNumber,
                perpage: perpageNumber,
            });
            // Retorna a resposta
            return res.status(200).json({
                ...result,
                status_code: 200,
            });
        }
        catch (error) {
            const publicErrorObject = new erros_1.ServiceError({
                message: "Erro na conexão com Banco ou na Query.",
                cause: error,
            });
            console.error(publicErrorObject);
            res.status(publicErrorObject.statusCode).json(publicErrorObject);
        }
    }
}
exports.ListServiceController = ListServiceController;
