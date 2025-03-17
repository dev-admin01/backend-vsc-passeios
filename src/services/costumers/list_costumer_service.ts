import prismaClient from "../../prisma";
import { Prisma } from "@prisma/client";

interface IListCostumersRequest {
  search?: string;
  page: number;
  perpage: number;
}

class ListCostumerService {
  async execute({ search, page, perpage }: IListCostumersRequest) {
    const skip = (page - 1) * perpage;

    // Filtro para busca em vários campos, usando modo "insensitive"
    const whereCondition: Prisma.costumerWhereInput = search
      ? {
          OR: [
            { nome: { contains: search, mode: "insensitive" } },
            { cpf_cnpj: { contains: search, mode: "insensitive" } },
            { passaporte: { contains: search, mode: "insensitive" } },
            { razao_social: { contains: search, mode: "insensitive" } },
            { nome_fantasia: { contains: search, mode: "insensitive" } },
            { ddi: { contains: search, mode: "insensitive" } },
            { ddd: { contains: search, mode: "insensitive" } },
            { telefone: { contains: search, mode: "insensitive" } },
            { indicacao: { contains: search, mode: "insensitive" } },
          ],
        }
      : {};

    // Conta quantos registros existem no total
    const totalCount = await prismaClient.costumer.count({
      where: whereCondition,
    });

    // Calcula a última página
    const lastPage = Math.ceil(totalCount / perpage);

    // Busca os registros paginados
    const costumers = await prismaClient.costumer.findMany({
      where: whereCondition,
      skip,
      take: perpage,
      select: {
        id_costumer: true,
        nome: true,
        cpf_cnpj: true,
        passaporte: true,
        razao_social: true,
        nome_fantasia: true,
        ddi: true,
        ddd: true,
        telefone: true,
        indicacao: true,
        created_at: true,
        updated_at: true,
      },
    });

    return {
      costumers,
      page,
      perpage,
      lastPage,
      totalCount,
    };
  }
}

export { ListCostumerService };
