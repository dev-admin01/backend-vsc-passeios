import prismaClient from "../../prisma";

class DeleteCostumerService {
  async execute(id_costumer: string) {
    await prismaClient.costumer.delete({
      where: { id_costumer },
    });
  }
}

export { DeleteCostumerService };
