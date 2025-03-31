import { Request, Response } from "express";
import { UpdateOrderDocsService } from "../../services/costumers/custumer_docs_service";
import { ServiceError } from "../../shared/erros";

class UpdateOrderDocs {
  async handle(req: Request, res: Response) {
    try {
      const {
        id_order,
        cpf_cnpj,
        passaport,
        name,
        email,
        ddi,
        ddd,
        phone,
        compPag,
        cnh,
      } = req.body;
      const createCostumerService = new UpdateOrderDocsService();

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

      return res.status(201).json({
        message: "Comprovante enviado com sucesso",
        status_code: 200,
      });
    } catch (error) {
      const publicErrorObject = new ServiceError({
        message: "Erro ao enviar comprovante.",
        cause: error,
      });
      console.error(publicErrorObject);
      return res.status(publicErrorObject.statusCode).json(publicErrorObject);
    }
  }
}

export { UpdateOrderDocs };
