import prismaClient from "../../prisma";
import { CostumerType } from "../../types/costumer.type";
class CreateCostumerService {
  async execute({
    nome,
    cpf_cnpj,
    passaporte,
    razao_social,
    nome_fantasia,
    ddi,
    ddd,
    telefone,
    indicacao,
  }: CostumerType) {
    const costumer = await prismaClient.costumer.create({
      data: {
        nome,
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

    return costumer;
  }
}

export { CreateCostumerService };
