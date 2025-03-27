import prismaClient from "../../prisma";
import { Prisma } from "@prisma/client";

interface IListOrdersRequest {
  search?: string;
  page: number;
  perpage: number;
}

class ListOrderService {
  async execute({ search, page, perpage }: IListOrdersRequest) {
    const skip = (page - 1) * perpage;

    // whereCondition para buscar por costumer.nome ou user.name
    const whereCondition: Prisma.ordersWhereInput = search
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
      : {};

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

    return {
      orders: ordersList,
      page,
      perpage,
      lastPage,
      totalCount,
    };
  }
}

export { ListOrderService };
