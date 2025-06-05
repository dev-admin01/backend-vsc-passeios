import prismaClient from "../../prisma";

class ListMidiaService {
  async execute() {
    const midias = await prismaClient.midia.findMany({
      select: {
        id_midia: true,
        description: true,
        created_at: true,
      },
    });

    return midias;
  }
}

export { ListMidiaService };
