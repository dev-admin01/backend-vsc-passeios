import prismaClient from "../../prisma";
import { Prisma } from "@prisma/client";
import { IListOrdersRequest } from "../../types/order.type";
import { ConvertCurrency } from "../../shared/convert_currency";

class ListOrderService {
  async execute({ search, page, perpage, id_user }: IListOrdersRequest) {
    const skip = (page - 1) * perpage;

    // Buscar a posição do usuário se id_user for fornecido
    let userPosition: number;
    if (id_user) {
      const user = await prismaClient.user.findUnique({
        where: { id_user },
        select: { id_position: true },
      });
      userPosition = user?.id_position;
    }

    // whereCondition para buscar por costumer.nome ou user.name
    const whereCondition: Prisma.ordersWhereInput = {
      ...(search
        ? {
            OR: [
              {
                costumer: {
                  nome: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
              },
              {
                user: {
                  name: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
              },
              {
                status: {
                  description: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
              },
              {
                order_number: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                pre_name: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                pre_email: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            ],
          }
        : {}),
      ...(userPosition === 3 ? { id_user } : {}),
    };

    // Contar total
    const totalCount = await prismaClient.orders.count({
      where: whereCondition,
    });

    // última página
    const lastPage = Math.ceil(totalCount / perpage);

    // Buscar registros
    const ordersList = await prismaClient.orders.findMany({
      where: whereCondition,
      skip,
      take: perpage,
      orderBy: {
        created_at: "desc",
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
        user: {
          select: {
            id_user: true,
            name: true,
          },
        },
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
            discount: true,
            price: true,
            suggested_date: true,
            service: {
              select: {
                description: true,
              },
            },
          },
        },
      },
    });

    ordersList.forEach(order => {
      order.price = ConvertCurrency.centsToReal(order.price);
    });

    return {
      orders: ordersList,
      page,
      perpage,
      lastPage,
      totalCount,
      userPosition,
    };
  }
}

export { ListOrderService };
