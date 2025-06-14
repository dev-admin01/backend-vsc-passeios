import { Request, Response } from "express";
import { UpdateOrderDocsService } from "../../services/costumers/custumer_docs_service";
import { ServiceError } from "../../shared/erros";

class UpdateOrderDocs {
  async handle(req: Request, res: Response) {
    try {
      const body = req.body;
      const {
        id_order,
        cpf_cnpj,
        passaport,
        name,
        email,
        ddi,
        ddd,
        phone,
        hotel,
        hotelCheckin,
        hotelCheckout,
        compPag,
        cnh,
      } = body;

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
        hotel,
        hotelCheckin,
        hotelCheckout,
        compPag,
        cnh,
      });

      return res.status(200).json({
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
