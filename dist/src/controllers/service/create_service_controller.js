"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateServiceController = void 0;
const create_service_service_1 = require("../../services/services/create_service_service");
const erros_1 = require("../../shared/erros");
class CreateServiceController {
    async handle(req, res) {
        try {
            const { description, type, price, observation, time } = req.body;
            const serviceServ = new create_service_service_1.CreateServiceService();
            const service = await serviceServ.execute({
                description,
                type,
                price,
                observation,
                time,
            });
            return res.status(201).json({
                message: "Passeio criado com sucesso!",
                service,
                status_code: 201,
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
exports.CreateServiceController = CreateServiceController;
