"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunMigrationsController = void 0;
const run_migrations_services_1 = require("../../services/migrations/run_migrations_services");
const erros_1 = require("../../shared/erros");
class RunMigrationsController {
    async handle(req, res) {
        try {
            const migrationsService = new run_migrations_services_1.RunMigrationsService();
            const migrations = await migrationsService.execute();
            return res.status(201).json(migrations);
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
exports.RunMigrationsController = RunMigrationsController;
