import prismaClient from "../../prisma";

class DeleteMidiaService {
  async execute(id: number) {
    const midia = await prismaClient.midia.delete({
      where: {
        id_midia: id,
      },
    });

    return midia;
  }
}

export { DeleteMidiaService };
