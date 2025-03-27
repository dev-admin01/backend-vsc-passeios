import prismaClient from "../../prisma";

class DeleteOrderService {
  async execute(id_order: string) {
    await prismaClient.orders.delete({
      where: { id_order },
    });
  }
}

export { DeleteOrderService };
