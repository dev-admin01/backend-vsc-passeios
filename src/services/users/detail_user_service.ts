import prismaClient from "../../prisma";

class DetailUserService {
  async execute(id_user: string) {
    const user = await prismaClient.user.findFirst({
      where: {
        id_user: id_user,
      },
      select: {
        id_user: true,
        name: true,
        email: true,
        id_position: true,
      },
    });
    return user;
  }
}

export { DetailUserService };
