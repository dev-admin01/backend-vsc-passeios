"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrderDocs = void 0;
const custumer_docs_service_1 = require("../../services/costumers/custumer_docs_service");
const erros_1 = require("../../shared/erros");
class UpdateOrderDocs {
    async handle(req, res) {
        try {
            const body = req.body;
            const { id_order, cpf_cnpj, passaport, name, email, ddi, ddd, phone, compPag, cnh, } = body;
            const createCostumerService = new custumer_docs_service_1.UpdateOrderDocsService();
            await createCostumerService.execute({
                id_order,
                cpf_cnpj,
                passaporte: passaport,
                nome: name,
                email,
                ddi,
                ddd,
                telefone: phone,
                compPag,
                cnh,
            });
            return res.status(200).json({
                message: "Comprovante enviado com sucesso",
                status_code: 200,
            });
        }
        catch (error) {
            const publicErrorObject = new erros_1.ServiceError({
                message: "Erro ao enviar comprovante.",
                cause: error,
            });
            console.error(publicErrorObject);
            return res.status(publicErrorObject.statusCode).json(publicErrorObject);
        }
    }
}
exports.UpdateOrderDocs = UpdateOrderDocs;
