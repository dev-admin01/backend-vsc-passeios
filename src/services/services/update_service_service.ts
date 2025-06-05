import prismaClient from "../../prisma";
import { ServiceType } from "../../types/service.type";
import { ConvertCurrency } from "../../shared/convert_currency";

class UpdateServiceService {
  async execute({
    id_service,
    description,
    type,
    price,
    time,
    observation,
  }: ServiceType) {
    const priceCents = ConvertCurrency.realToCents(price);

    console.log(id_service);
    console.log(description);
    console.log(type);
    console.log(priceCents);
    console.log(observation);
    console.log(time);
    console.log(typeof time);

    const timeString = Array.isArray(time) ? JSON.stringify(time) : time;
    const updatedService = await prismaClient.service.update({
      where: { id_service },
      data: {
        description,
        type,
        price: priceCents,
        time: timeString,
        observation,
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

    return updatedService;
  }
}

export { UpdateServiceService };
function realToCents(price: string) {
  throw new Error("Function not implemented.");
}
