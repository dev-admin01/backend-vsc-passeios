import prismaClient from "../../prisma";
import { ConvertCurrency } from "../../shared/convert_currency";
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
    id_cond_pag,
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
        id_cond_pag,
        orders_service: {
          update: services
            .filter(service => service.id_order_service !== undefined)
            .map(service => ({
              where: { id_order_service: service.id_order_service },
              data: {
                id_service: service.id_service,
                discount: service.discount,
                price: ConvertCurrency.realToCents(service.price),
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
              price: ConvertCurrency.realToCents(service.price),
              suggested_date: service.suggested_date
                ? new Date(service.suggested_date)
                : null,
            })),
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
        id_cond_pag: true,
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

    await prismaClient.orders_history.create({
      data: {
        id_order,
        id_user,
        id_status_order: 1,
      },
    });

    return updatedOrder;
  }
}

export { UpdateOrderService };
