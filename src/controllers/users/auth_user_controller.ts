import { Request, Response } from "express";
import { AuthUserService } from "../../services/users/auth_user_service";
import { ServiceError } from "../../shared/erros";

class AuthUserController {
  async handle(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const userService = new AuthUserService();

      const user = await userService.execute({ email, password });

      if (user.email === "invalid") {
        return res.status(400).json({
          message: "Usuário ou Senha inválidos.",
          status_code: 400,
        });
      }

      return res.status(200).json({
        message: "Autenticação realizada com sucesso",
        user,
        status_code: 200,
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

export { AuthUserController };
