import prismaClient from "../../prisma";

class GetServiceService {
  async execute({ id }: { id: number }) {
    const service = await prismaClient.service.findUnique({
      where: { id_service: id },
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
    return service;
  }
}

export { GetServiceService };
