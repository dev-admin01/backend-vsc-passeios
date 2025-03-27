import prismaClient from "../../prisma";

class GetOrderService {
  async execute(id_order: string) {
    const order = await prismaClient.orders.findUnique({
      where: { id_order },
      include: {
        costumer: true,
        user: true,
        status: true,
        orders_service: {
          include: {
            service: {
              select: {
                description: true,
                type: true,
                observation: true,
              },
            },
          },
        },
        orders_history: true,
      },
    });

    return order;
  }
}

export { GetOrderService };
