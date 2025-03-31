import prismaClient from "../../prisma";
import { SendStatusOrder } from "../../types/status_order.type";

class SendStatusService {
  async execute({ id_order, id_user, id_status_order }: SendStatusOrder) {
    console.log(id_order);
    await prismaClient.orders.update({
      where: { id_order },
      data: {
        id_status_order,
      },
    });

    await prismaClient.orders_history.create({
      data: {
        id_order,
        id_user,
        id_status_order,
      },
    });
  }
}
export { SendStatusService };
