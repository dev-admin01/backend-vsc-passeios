import prismaClient from "../../prisma";

interface CreateCondicaoPagamentoType {
  description: string;
  installments: string;
  discount: string;
}

class CreateCondicaoPagamentoService {
  async execute({
    description,
    installments,
    discount,
  }: CreateCondicaoPagamentoType) {
    const condicaoPagamento = await prismaClient.condicao_Pagamento.create({
      data: {
        description,
        discount,
        installments,
      },
    });

    return condicaoPagamento;
  }
}

export { CreateCondicaoPagamentoService };
