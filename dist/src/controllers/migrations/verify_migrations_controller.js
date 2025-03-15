"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyMigrationsController = void 0;
const verify_migrations_service_1 = require("../../services/migrations/verify_migrations_service");
const erros_1 = require("../../shared/erros");
class VerifyMigrationsController {
    async handle(req, res) {
        try {
            const migrationsService = new verify_migrations_service_1.VerifyMigrationsService();
            const migrations = await migrationsService.execute();
            return res.status(200).json({
                migrations,
            });
        }
        catch (error) {
            const publicErrorObject = new erros_1.ServiceError({
                message: "Erro na conexão com Banco ou na Query.",
                cause: error,
            });
            console.error(publicErrorObject);
            return res.status(publicErrorObject.statusCode).json(publicErrorObject);
        }
    }
}
exports.VerifyMigrationsController = VerifyMigrationsController;
