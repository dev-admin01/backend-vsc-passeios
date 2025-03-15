"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserController = void 0;
const create_user_service_1 = require("../../services/users/create_user_service");
const erros_1 = require("../../shared/erros");
class CreateUserController {
    async handle(req, res) {
        try {
            const { name, email, password, id_position, ddd, ddi, phone } = req.body;
            const userService = new create_user_service_1.CreateUserService();
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
exports.CreateUserController = CreateUserController;
