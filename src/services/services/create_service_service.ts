import prismaClient from "../../prisma";
import { ServiceType } from "../../types/service.type";

class CreateServiceService {
  async execute({ description, type, price, observation }: ServiceType) {
    const data = await prismaClient.service.create({
      data: {
        description,
        type,
        price,
        observation,
      },
      select: {
        id_service: true,
        description: true,
        type: true,
        price: true,
        observation: true,
        created_at: true,
        updated_at: true,
      },
    });

    return data;
  }
}

export { CreateServiceService };
