import prismaClient from "../../prisma";
import { UserRequest } from "../../types/user.types";
import { hash } from "bcrypt";

class CreateUserService {
  async execute({
    name,
    email,
    password,
    id_position,
    ddd,
    ddi,
    phone,
  }: UserRequest) {
    if (!email) {
      throw new Error("Email incorrect");
    }
    const normalizedEmail = email.toLowerCase();

    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: {
          equals: normalizedEmail,
          mode: "insensitive",
        },
      },
    });

    if (userAlreadyExists) {
      const data = { email: "User already exists" };
      return data;
    }

    const passwordHash = await hash(password, 8);

    const data = await prismaClient.user.create({
      data: {
        name,
        email,
        password: passwordHash,
        id_position,
        ddd,
        ddi,
        phone,
      },
      select: {
        id_user: true,
        name: true,
        email: true,
        id_position: true,
        ddi: true,
        ddd: true,
        phone: true,
        created_at: true,
        updated_at: true,
      },
    });

    return data;
  }
}

export { CreateUserService };
