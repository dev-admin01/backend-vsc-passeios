"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCostumerController = void 0;
const create_costumer_service_1 = require("../../services/costumers/create_costumer_service");
const erros_1 = require("../../shared/erros");
class CreateCostumerController {
    async handle(req, res) {
        try {
            const { nome, email, cpf_cnpj, passaporte, razao_social, nome_fantasia, ddi, ddd, telefone, indicacao, } = req.body;
            const createCostumerService = new create_costumer_service_1.CreateCostumerService();
            const costumer = await createCostumerService.execute({
                nome,
                email,
                cpf_cnpj,
                passaporte,
                razao_social,
                nome_fantasia,
                ddi,
                ddd,
                telefone,
                indicacao,
            });
            return res.status(201).json({
                message: "Cliente criado com sucesso",
                costumer,
                status_code: 201,
            });
        }
        catch (error) {
            const publicErrorObject = new erros_1.ServiceError({
                message: "Erro ao criar costumer.",
                cause: error,
            });
            console.error(publicErrorObject);
            return res.status(publicErrorObject.statusCode).json(publicErrorObject);
        }
    }
}
exports.CreateCostumerController = CreateCostumerController;
