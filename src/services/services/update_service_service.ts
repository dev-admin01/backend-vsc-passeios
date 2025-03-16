import prismaClient from "../../prisma";

interface UpdateServiceData {
  id: number;
  description: string;
  type: string;
  price: string;
  observation: string;
}

class UpdateServiceService {
  async execute({
    id,
    description,
    type,
    price,
    observation,
  }: UpdateServiceData) {
    const updatedService = await prismaClient.service.update({
      where: { id_service: id },
      data: { description, type, price, observation },
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

    return updatedService;
  }
}

export { UpdateServiceService };
