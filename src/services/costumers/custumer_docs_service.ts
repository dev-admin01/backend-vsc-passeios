import prismaClient from "../../prisma";
import { OrderDocs } from "../../types/orderDocs.type";

class UpdateOrderDocsService {
  async execute({
    id_order,
    cpf_cnpj,
    passaporte,
    nome,
    email,
    ddi,
    ddd,
    telefone,
    compPag,
    cnh,
  }: OrderDocs) {
    const costumer = await prismaClient.costumer.create({
      data: {
        nome,
        email,
        cpf_cnpj,
        passaporte,
        ddi,
        ddd,
        telefone,
      },
      select: {
        id_costumer: true,
      },
    });

    await prismaClient.orders.update({
      where: { id_order },
      data: {
        id_costumer: costumer.id_costumer,
        id_status_order: 3,
      },
    });

    const docsToCreate = [
      {
        id_order,
        name: "comp. pagamento",
        file: compPag,
      },
    ];

    if (cnh) {
      docsToCreate.push({
        id_order,
        name: "CNH",
        file: cnh,
      });
    }

    await prismaClient.order_documentation.createMany({
      data: docsToCreate,
    });

    await prismaClient.orders_history.create({
      data: {
        id_order,
        id_status_order: 3,
      },
    });
  }
}
export { UpdateOrderDocsService };
