import prismaClient from "../../prisma";
import { Prisma } from "@prisma/client";

interface IListOrderStatusRequest {
  search?: string;
  page: number;
  perpage: number;
}

class ListOrderStatusService {
  async execute({ search, page, perpage }: IListOrderStatusRequest) {
    const skip = (page - 1) * perpage;

    // Se "search" existir, filtra a coluna "description"
    const whereCondition: Prisma.orders_statusWhereInput = search
      ? {
          description: {
            contains: search,
            mode: "insensitive",
          },
        }
      : {};

    // Conta total de registros
    const totalCount = await prismaClient.orders_status.count({
      where: whereCondition,
    });

    // Calcula última página
    const lastPage = Math.ceil(totalCount / perpage);

    // Busca registros paginados
    const orderStatus = await prismaClient.orders_status.findMany({
      where: whereCondition,
      skip,
      take: perpage,
      select: {
        id_status_order: true,
        description: true,
        created_at: true,
      },
    });

    return {
      orderStatus,
      page,
      perpage,
      lastPage,
      totalCount,
    };
  }
}

export { ListOrderStatusService };
