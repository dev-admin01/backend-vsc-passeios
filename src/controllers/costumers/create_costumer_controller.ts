import { Request, Response } from "express";
import { CreateCostumerService } from "../../services/costumers/create_costumer_service";
import { ServiceError } from "../../shared/erros";

class CreateCostumerController {
  async handle(req: Request, res: Response) {
    try {
      const {
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
      } = req.body;

      const createCostumerService = new CreateCostumerService();

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
    } catch (error) {
      const publicErrorObject = new ServiceError({
        message: "Erro ao criar costumer.",
        cause: error,
      });
      console.error(publicErrorObject);
      return res.status(publicErrorObject.statusCode).json(publicErrorObject);
    }
  }
}

export { CreateCostumerController };
