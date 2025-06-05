"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMidiaController = void 0;
const midia_1 = require("../../services/midia");
const erros_1 = require("../../shared/erros");
class UpdateMidiaController {
    async handle(req, res) {
        try {
            const { id } = req.params;
            const { description } = req.body;
            const updateMidiaService = new midia_1.UpdateMidiaService();
            const midia = await updateMidiaService.execute(Number(id), {
                description,
            });
            return res.status(200).json({
                message: "Mídia atualizada com sucesso",
                midia: midia,
                status_code: 200,
            });
        }
        catch (error) {
            const publicErrorObject = new erros_1.ServiceError({
                message: "Erro ao atualizar mídia.",
                cause: error,
            });
            console.error(publicErrorObject);
            return res.status(publicErrorObject.statusCode).json(publicErrorObject);
        }
    }
}
exports.UpdateMidiaController = UpdateMidiaController;
