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
    hotel,
    hotelCheckin,
    hotelCheckout,
  }: OrderDocs) {
    const costumer = await prismaClient.costumer.create({
      data: {
        nome,
        email,
        cpf_cnpj,
        passaporte: passaporte || null,
        ddi,
        ddd,
        telefone,
      },
      select: {
        id_costumer: true,
      },
    });

    // Formatando as datas para ISO-8601
    const formattedCheckin = hotelCheckin
      ? new Date(hotelCheckin).toISOString()
      : null;
    const formattedCheckout = hotelCheckout
      ? new Date(hotelCheckout).toISOString()
      : null;

    await prismaClient.orders.update({
      where: { id_order },
      data: {
        id_costumer: costumer.id_costumer,
        id_status_order: 6,
        hotel,
        hotel_checkin: formattedCheckin,
        hotel_checkout: formattedCheckout,
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
        id_status_order: 6,
      },
    });
  }
}
export { UpdateOrderDocsService };
