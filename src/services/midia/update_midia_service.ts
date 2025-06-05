import prismaClient from "../../prisma";

interface UpdateMidiaType {
  description: string;
}

class UpdateMidiaService {
  async execute(id: number, { description }: UpdateMidiaType) {
    const midia = await prismaClient.midia.update({
      where: {
        id_midia: id,
      },
      data: {
        description,
      },
      select: {
        id_midia: true,
        description: true,
        created_at: true,
      },
    });

    return midia;
  }
}

export { UpdateMidiaService };
