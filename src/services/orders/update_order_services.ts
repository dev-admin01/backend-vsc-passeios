import prismaClient from "../../prisma";
import { IUpdateOrderRequest } from "../../types/order.type";

class UpdateOrderService {
  async execute({
    id_order,
    id_user,
    id_costumer,
    price,
    id_status_order,
    services,
    pre_name,
    pre_email,
    pre_ddi,
    pre_ddd,
    pre_phone,
  }: IUpdateOrderRequest) {
    const updatedOrder = await prismaClient.orders.update({
      where: { id_order },
      data: {
        id_user,
        id_costumer,
        price,
        id_status_order,
        pre_name,
        pre_email,
        pre_ddi,
        pre_ddd,
        pre_phone,
        orders_service: {
          update: services
            .filter(service => service.id_order_service !== undefined)
            .map(service => ({
              where: { id_order_service: service.id_order_service },
              data: {
                id_service: service.id_service,
                discount: service.discount,
                price: service.price,
                suggested_date: service.suggested_date
                  ? new Date(service.suggested_date)
                  : null,
              },
            })),
          create: services
            .filter(service => !service.id_order_service)
            .map(service => ({
              id_service: service.id_service,
              discount: service.discount,
              price: service.price,
              suggested_date: service.suggested_date
                ? new Date(service.suggested_date)
                : null,
            })),
        },
        // Cria um registro em orders_history para o histórico da ordem
        orders_history: {
          create: {
            id_user,
          },
        },
      },
      select: {
        id_order: true,
        order_number: true,
        pre_name: true,
        pre_email: true,
        pre_ddi: true,
        pre_ddd: true,
        pre_phone: true,
        price: true,
        created_at: true,
        costumer: {
          select: {
            id_costumer: true,
            nome: true,
          },
        },
        status: {
          select: {
            id_status_order: true,
            description: true,
          },
        },
        orders_service: {
          select: {
            id_order_service: true,
            id_service: true,
            id_order: true,
            discount: true,
            price: true,
            suggested_date: true,
          },
        },
      },
    });

    return updatedOrder;
  }
}

export { UpdateOrderService };
