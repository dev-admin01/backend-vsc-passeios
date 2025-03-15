"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserController = void 0;
const auth_user_service_1 = require("../../services/users/auth_user_service");
const erros_1 = require("../../shared/erros");
class AuthUserController {
    async handle(req, res) {
        try {
            const { email, password } = req.body;
            const userService = new auth_user_service_1.AuthUserService();
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
        }
        catch (error) {
            const publicErrorObject = new erros_1.ServiceError({
                message: "Erro na conexão com Banco ou na Query.",
                cause: error,
            });
            console.error(publicErrorObject);
            res.status(publicErrorObject.statusCode).json(publicErrorObject);
        }
    }
}
exports.AuthUserController = AuthUserController;
