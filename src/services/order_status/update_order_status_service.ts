import prismaClient from "../../prisma";

interface UpdateOrderStatusRequest {
  id_status_order: number;
  description: string;
}

class UpdateOrderStatusService {
  async execute({ id_status_order, description }: UpdateOrderStatusRequest) {
    const updated = await prismaClient.orders_status.update({
      where: { id_status_order },
      data: { description },
      select: {
        id_status_order: true,
        description: true,
        created_at: true,
      },
    });

    return updated;
  }
}

export { UpdateOrderStatusService };
