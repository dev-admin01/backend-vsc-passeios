import prismaClient from "../../prisma";

class DeleteOrderStatusService {
  async execute(id_status_order: number) {
    await prismaClient.orders_status.delete({
      where: { id_status_order },
    });
  }
}

export { DeleteOrderStatusService };
