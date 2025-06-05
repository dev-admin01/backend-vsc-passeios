import prismaClient from "../../prisma";
import { ConvertCurrency } from "../../shared/convert_currency";

class GetServiceService {
  async execute({ id }: { id: number }) {
    const service = await prismaClient.service.findUnique({
      where: { id_service: id },
      select: {
        id_service: true,
        description: true,
        type: true,
        price: true,
        time: true,
        observation: true,
        created_at: true,
        updated_at: true,
      },
    });

    service.price = ConvertCurrency.centsToReal(service.price);
    console.log(service.price);
    return service;
  }
}

export { GetServiceService };
