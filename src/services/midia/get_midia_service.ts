import prismaClient from "../../prisma";

class GetMidiaService {
  async execute(id: number) {
    const midia = await prismaClient.midia.findUnique({
      where: {
        id_midia: id,
      },
      select: {
        id_midia: true,
        description: true,
        created_at: true,
      },
    });

    if (!midia) {
      throw new Error("Mídia não encontrada");
    }

    return midia;
  }
}

export { GetMidiaService };
