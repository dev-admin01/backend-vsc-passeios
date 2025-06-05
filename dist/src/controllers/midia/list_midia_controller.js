"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListMidiaController = void 0;
const midia_1 = require("../../services/midia");
const erros_1 = require("../../shared/erros");
class ListMidiaController {
    async handle(req, res) {
        try {
            const listMidiaService = new midia_1.ListMidiaService();
            const midias = await listMidiaService.execute();
            return res.status(200).json({
                message: "Mídias listadas com sucesso",
                midias: midias,
                status_code: 200,
            });
        }
        catch (error) {
            const publicErrorObject = new erros_1.ServiceError({
                message: "Erro ao listar mídias.",
                cause: error,
            });
            console.error(publicErrorObject);
            return res.status(publicErrorObject.statusCode).json(publicErrorObject);
        }
    }
}
exports.ListMidiaController = ListMidiaController;
