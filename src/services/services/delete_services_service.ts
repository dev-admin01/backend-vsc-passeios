import prismaClient from "../../prisma";

interface DeleteServiceData {
  id: number;
}

class DeleteServiceService {
  async execute({ id }: DeleteServiceData) {
    await prismaClient.service.delete({
      where: { id_service: id },
    });
  }
}

export { DeleteServiceService };
