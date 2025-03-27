import prismaClient from "../../prisma";
import { ICreateOrderService } from "../../types/order.type";

class CreateOrderService {
  async execute({
    id_user,
    price,
    services = [],
    pre_name,
    pre_email,
    pre_ddi,
    pre_ddd,
    pre_phone,
  }: ICreateOrderService) {
    const lastOrder = await prismaClient.orders.findFirst({
      orderBy: { created_at: "desc" },
      select: { order_number: true },
    });

    let sequence = 1;
    if (lastOrder && lastOrder.order_number) {
      const lastSequence = parseInt(lastOrder.order_number.substring(0, 4));
      if (!isNaN(lastSequence)) {
        sequence = lastSequence + 1;
      } else {
        sequence = 1;
      }
    }
    const sequenceStr = sequence.toString().padStart(4, "0");

    const now = new Date();
    const monthStr = (now.getMonth() + 1).toString().padStart(2, "0");
    const yearStr = now.getFullYear().toString().slice(-2);

    const orderNumber = `${sequenceStr}${monthStr}${yearStr}`;

    const order = await prismaClient.orders.create({
      data: {
        id_user,
        order_number: orderNumber,
        price,
        id_status_order: 1,
        pre_name,
        pre_email,
        pre_ddi,
        pre_ddd,
        pre_phone,
      },
    });

    // 2. Cria os registros em orders_service, se houver
    if (services.length > 0) {
      const serviceData = services.map(srv => ({
        id_order: order.id_order,
        id_service: srv.id_service,
        discount: srv.discount,
        price: srv.price,
        suggested_date: srv.suggested_date,
      }));
      await prismaClient.orders_service.createMany({ data: serviceData });
    }

    // 3. Registra a criação da order em orders_history
    await prismaClient.orders_history.create({
      data: {
        id_order: order.id_order,
        id_user,
      },
    });

    const completeOrder = await prismaClient.orders.findUnique({
      where: { id_order: order.id_order },
      select: {
        id_order: true,
        id_user: true,
        id_status_order: true,
        order_number: true,
        pre_name: true,
        pre_email: true,
        pre_ddi: true,
        pre_ddd: true,
        pre_phone: true,
        price: true,
        created_at: true,
        orders_service: {
          select: {
            id_order_service: true,
            id_order: true,
            id_service: true,
            discount: true,
            price: true,
            suggested_date: true,
          },
        },
      },
    });

    return completeOrder;
  }
}

export { CreateOrderService };
