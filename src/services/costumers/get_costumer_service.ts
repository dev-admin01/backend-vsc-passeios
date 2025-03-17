import prismaClient from "../../prisma";

class GetCostumerService {
  async execute(id_costumer: string) {
    const costumer = await prismaClient.costumer.findUnique({
      where: { id_costumer },
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

export { GetCostumerService };
