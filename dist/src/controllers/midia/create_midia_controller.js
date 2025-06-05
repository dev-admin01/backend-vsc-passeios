"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMidiaController = void 0;
const midia_1 = require("../../services/midia");
const erros_1 = require("../../shared/erros");
class CreateMidiaController {
    async handle(req, res) {
        try {
            const { description } = req.body;
            const createMidiaService = new midia_1.CreateMidiaService();
            const midia = await createMidiaService.execute({
                description,
            });
            return res.status(201).json({
                message: "Mídia criada com sucesso",
                midia: midia,
                status_code: 201,
            });
        }
        catch (error) {
            const publicErrorObject = new erros_1.ServiceError({
                message: "Erro ao criar mídia.",
                cause: error,
            });
            console.error(publicErrorObject);
            return res.status(publicErrorObject.statusCode).json(publicErrorObject);
        }
    }
}
exports.CreateMidiaController = CreateMidiaController;
