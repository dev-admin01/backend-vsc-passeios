import prismaClient from "../../prisma";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import { AuthRequest } from "../../types/user.types";

class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    const user = await prismaClient.user.findFirst({
      where: {
        email: {
          equals: email,
        },
      },
    });
    if (!user) {
      const data = { email: "invalid" };
      return data;
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      const data = { email: "invalid" };
      return data;
    }

    const token = sign(
      {
        name: user.name,
        email: user.email,
      },

      process.env.JWT_SECRET,
      {
        subject: user.id_user,
        expiresIn: "30d",
      },
    );
    return {
      id_user: user.id_user,
      name: user.name,
      email: user.email,
      id_position: user.id_position,
      token,
    };
  }
}

export { AuthUserService };
