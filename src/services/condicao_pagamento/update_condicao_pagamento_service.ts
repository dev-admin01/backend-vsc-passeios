import prismaClient from "../../prisma";

interface UpdateCondicaoPagamentoType {
  description: string;
  installments: string;
  discount: string;
}

class UpdateCondicaoPagamentoService {
  async execute(
    id_cond_pag: string,
    { description, installments, discount }: UpdateCondicaoPagamentoType,
  ) {
    const condicaoPagamento = await prismaClient.condicao_Pagamento.update({
      where: {
        id_cond_pag,
      },
      data: {
        description,
        installments,
        discount,
      },
    });

    return condicaoPagamento;
  }
}

export { UpdateCondicaoPagamentoService };
