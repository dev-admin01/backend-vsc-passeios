import prismaClient from "../../prisma";
import { ConvertCurrency } from "../../shared/convert_currency";

class GetOrderRegisterLinkService {
  async execute(id_order: string) {
    const order = await prismaClient.orders.findUnique({
      where: { id_order },
      select: {
        id_order: true,
        order_number: true,
        id_status_order: true,
        price: true,
        pre_name: true,
        pre_email: true,
        pre_ddi: true,
        pre_ddd: true,
        pre_phone: true,
        created_at: true,
        orders_service: {
          select: {
            id_order_service: true,
            id_service: true,
            discount: true,
            price: true,
            suggested_date: true,
            quantity: true,
            time: true,
            service: {
              select: {
                description: true,
                observation: true,
                type: true,
              },
            },
          },
        },
        cond_pag: {
          select: {
            description: true,
            installments: true,
            discount: true,
          },
        },
        coupons: {
          select: {
            coupon: true,
            discount: true,
          },
        },
        costumer: {
          select: {
            id_costumer: true,
            nome: true,
            email: true,
            cpf_cnpj: true,
            passaporte: true,
            razao_social: true,
            nome_fantasia: true,
            ddi: true,
            ddd: true,
            telefone: true,
            indicacao: true,
          },
        },
      },
    });

    order.price = ConvertCurrency.centsToReal(order.price);

    order.orders_service.forEach(service => {
      service.price = ConvertCurrency.centsToReal(service.price);
    });

    return order;
  }
}

export { GetOrderRegisterLinkService };
