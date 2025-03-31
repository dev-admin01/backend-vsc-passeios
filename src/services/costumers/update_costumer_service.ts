import prismaClient from "../../prisma";
import { CostumerType } from "../../types/costumer.type";

interface UpdateCostumerRequest extends CostumerType {
  id_costumer: string; // obrigatório
}

class UpdateCostumerService {
  async execute({
    id_costumer,
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
  }: UpdateCostumerRequest) {
    const updatedCostumer = await prismaClient.costumer.update({
      where: { id_costumer },
      data: {
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
      },
      select: {
        id_costumer: true,
        nome: true,
        cpf_cnpj: true,
        passaporte: true,
        razao_social: true,
        nome_fantasia: true,
        ddi: true,
        ddd: true,
        telefone: true,
        indicacao: true,
        created_at: true,
        updated_at: true,
      },
    });

    return updatedCostumer;
  }
}

export { UpdateCostumerService };
