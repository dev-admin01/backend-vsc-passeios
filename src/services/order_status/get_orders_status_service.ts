import prismaClient from "../../prisma";

class GetOrderStatusService {
  async execute(id_status_order: number) {
    const orderStatus = await prismaClient.orders_status.findUnique({
      where: { id_status_order },
      select: {
        id_status_order: true,
        description: true,
        created_at: true,
      },
    });

    return orderStatus;
  }
}

export { GetOrderStatusService };
