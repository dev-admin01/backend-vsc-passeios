import prismaClient from "../../prisma";

class DeleteCondicaoPagamentoService {
  async execute(id_cond_pag: string) {
    await prismaClient.condicao_Pagamento.delete({
      where: {
        id_cond_pag,
      },
    });
  }
}

export { DeleteCondicaoPagamentoService };
