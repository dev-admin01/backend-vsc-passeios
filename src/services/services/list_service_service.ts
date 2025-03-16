import prismaClient from "../../prisma";
import { Prisma } from "@prisma/client";

interface IListServicesRequest {
  search?: string;
  page: number;
  perpage: number;
}

class ListServiceService {
  async execute({ search, page, perpage }: IListServicesRequest) {
    const skip = (page - 1) * perpage;

    // Onde criamos a condição de busca
    const whereCondition = search
      ? {
          OR: [
            {
              description: {
                contains: search,
                // Aqui usamos a enum do Prisma no lugar de "insensitive"
                mode: Prisma.QueryMode.insensitive,
              },
            },
            {
              observation: {
                contains: search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
            {
              type: {
                contains: search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
          ],
        }
      : {};

    const totalCount = await prismaClient.service.count({
      where: whereCondition,
    });

    const lastPage = Math.ceil(totalCount / perpage);

    const services = await prismaClient.service.findMany({
      where: whereCondition,
      skip,
      take: perpage,
      select: {
        id_service: true,
        description: true,
        type: true,
        price: true,
        observation: true,
        created_at: true,
        updated_at: true,
      },
    });

    return {
      services,
      page,
      perpage,
      lastPage,
      totalCount,
    };
  }
}

export { ListServiceService };
