import prismaClient from "../../prisma";

interface OrderStatusType {
  description: string;
}

class CreateOrderStatusService {
  async execute({ description }: OrderStatusType) {
    const orderStatus = await prismaClient.orders_status.create({
      data: { description },
      select: {
        id_status_order: true,
        description: true,
        created_at: true,
      },
    });

    return orderStatus;
  }
}

export { CreateOrderStatusService };
