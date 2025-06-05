import prismaClient from "../../prisma";
import { Prisma } from "@prisma/client";
import { IListCondicaoPagamentoRequest } from "../../types/condicao_pagamento.type";

class ListCondicaoPagamentoService {
  async execute({ search, page, perpage }: IListCondicaoPagamentoRequest) {
    const skip = (page - 1) * perpage;

    // Se "search" existir, filtra a coluna "description"
    const whereCondition: Prisma.Condicao_PagamentoWhereInput = search
      ? {
          OR: [
            {
              description: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              installments: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              discount: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        }
      : {};

    // Conta total de registros
    const totalCount = await prismaClient.condicao_Pagamento.count({
      where: whereCondition,
    });

    // Calcula última página
    const lastPage = Math.ceil(totalCount / perpage);

    // Busca registros paginados
    const condicoesPagamento = await prismaClient.condicao_Pagamento.findMany({
      where: whereCondition,
      skip,
      take: perpage,
      select: {
        id_cond_pag: true,
        description: true,
        installments: true,
        discount: true,
        created_at: true,
        updated_at: true,
      },
    });

    return {
      condicoesPagamento,
      page,
      perpage,
      lastPage,
      totalCount,
    };
  }
}

export { ListCondicaoPagamentoService };
