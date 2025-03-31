import { Request, Response } from "express";
import { UpdateCostumerService } from "../../services/costumers/update_costumer_service";
import { ServiceError } from "../../shared/erros";

class UpdateCostumerController {
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;
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

      const updateCostumerService = new UpdateCostumerService();
      const updatedCostumer = await updateCostumerService.execute({
        id_costumer: id,
        email,
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
    } catch (error) {
      const publicErrorObject = new ServiceError({
        message: "Erro ao atualizar costumer.",
        cause: error,
      });
      console.error(publicErrorObject);
      return res.status(publicErrorObject.statusCode).json(publicErrorObject);
    }
  }
}

export { UpdateCostumerController };
