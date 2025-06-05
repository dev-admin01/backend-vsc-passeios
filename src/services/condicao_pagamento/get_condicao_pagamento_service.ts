import prismaClient from "../../prisma";

class GetCondicaoPagamentoService {
  async execute(id_cond_pag: string) {
    const condicaoPagamento = await prismaClient.condicao_Pagamento.findUnique({
      where: {
        id_cond_pag,
      },
    });

    if (!condicaoPagamento) {
      throw new Error("Condição de pagamento não encontrada");
    }

    return condicaoPagamento;
  }
}

export { GetCondicaoPagamentoService };
