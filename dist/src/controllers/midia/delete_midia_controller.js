"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteMidiaController = void 0;
const midia_1 = require("../../services/midia");
const erros_1 = require("../../shared/erros");
class DeleteMidiaController {
    async handle(req, res) {
        try {
            const { id } = req.params;
            const deleteMidiaService = new midia_1.DeleteMidiaService();
            await deleteMidiaService.execute(Number(id));
            return res.status(200).json({
                message: "Mídia excluída com sucesso",
                status_code: 200,
            });
        }
        catch (error) {
            const publicErrorObject = new erros_1.ServiceError({
                message: "Erro ao excluir mídia.",
                cause: error,
            });
            console.error(publicErrorObject);
            return res.status(publicErrorObject.statusCode).json(publicErrorObject);
        }
    }
}
exports.DeleteMidiaController = DeleteMidiaController;
