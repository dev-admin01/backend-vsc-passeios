import { Request, Response } from "express";
import { CreateUserService } from "../../services/users/create_user_service";

import { ServiceError } from "../../shared/erros";

class CreateUserController {
  async handle(req: Request, res: Response) {
    try {
      const { name, email, password, id_position, ddd, ddi, phone } = req.body;
      const userService = new CreateUserService();

      const user = await userService.execute({
        name,
        email,
        password,
        id_position,
        ddd,
        ddi,
        phone,
      });

      if (user.email === "User already exists") {
        return res.status(500).json({
          message: "Usuário já cadastrado.",
          status_code: 500,
        });
      }

      return res.status(201).json({
        message: "User created successfully",
        user,
        status_code: 201,
      });
    } catch (error) {
      const publicErrorObject = new ServiceError({
        message: "Erro na conexão com Banco ou na Query.",
        cause: error,
      });
      console.error(publicErrorObject);
      res.status(publicErrorObject.statusCode).json(publicErrorObject);
    }
  }
}

export { CreateUserController };
