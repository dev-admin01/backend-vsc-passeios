import prismaClient from "../../prisma";

interface MidiaType {
  description: string;
}

class CreateMidiaService {
  async execute({ description }: MidiaType) {
    const midia = await prismaClient.midia.create({
      data: { description },
      select: {
        id_midia: true,
        description: true,
        created_at: true,
      },
    });

    return midia;
  }
}

export { CreateMidiaService };
