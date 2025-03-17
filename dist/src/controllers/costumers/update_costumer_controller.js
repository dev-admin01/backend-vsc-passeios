"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCostumerController = void 0;
const update_costumer_service_1 = require("../../services/costumers/update_costumer_service");
const erros_1 = require("../../shared/erros");
class UpdateCostumerController {
    async handle(req, res) {
        try {
            const { id } = req.params;
            const { nome, cpf_cnpj, passaporte, razao_social, nome_fantasia, ddi, ddd, telefone, indicacao, } = req.body;
            const updateCostumerService = new update_costumer_service_1.UpdateCostumerService();
            const updatedCostumer = await updateCostumerService.execute({
                id_costumer: id,
                nome,
                cpf_cnpj,
                passaporte,
                razao_social,
                nome_fantasia,
                ddi,
                ddd,
                telefone,
                indicacao,
            });
            return res.status(200).json({
                message: "Costumer updated successfully",
                costumer: updatedCostumer,
                status_code: 200,
            });
        }
        catch (error) {
            const publicErrorObject = new erros_1.ServiceError({
                message: "Erro ao atualizar costumer.",
                cause: error,
            });
            console.error(publicErrorObject);
            return res.status(publicErrorObject.statusCode).json(publicErrorObject);
        }
    }
}
exports.UpdateCostumerController = UpdateCostumerController;
