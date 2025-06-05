"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMidiaController = void 0;
const midia_1 = require("../../services/midia");
const erros_1 = require("../../shared/erros");
class GetMidiaController {
    async handle(req, res) {
        try {
            const { id } = req.params;
            const getMidiaService = new midia_1.GetMidiaService();
            const midia = await getMidiaService.execute(Number(id));
            return res.status(200).json({
                message: "Mídia encontrada com sucesso",
                midia: midia,
                status_code: 200,
            });
        }
        catch (error) {
            const publicErrorObject = new erros_1.ServiceError({
                message: "Erro ao buscar mídia.",
                cause: error,
            });
            console.error(publicErrorObject);
            return res.status(publicErrorObject.statusCode).json(publicErrorObject);
        }
    }
}
exports.GetMidiaController = GetMidiaController;
