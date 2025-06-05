import prismaClient from "../../prisma";
import { ServiceType } from "../../types/service.type";
import { ConvertCurrency } from "../../shared/convert_currency";

class CreateServiceService {
  async execute({ description, type, price, observation, time }: ServiceType) {
    const convertPrice = ConvertCurrency.realToCents(price as string);

    const timeString = Array.isArray(time) ? JSON.stringify(time) : time;

    const data = await prismaClient.service.create({
      data: {
        description,
        type,
        price: convertPrice,
        observation,
        time: timeString,
      },
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

    data.price = ConvertCurrency.centsToReal(data.price);

    return data;
  }
}

export { CreateServiceService };
