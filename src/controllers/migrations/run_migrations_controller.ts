import { Request, Response } from "express";
import { RunMigrationsService } from "../../services/migrations/run_migrations_services";
import { ServiceError } from "../../shared/erros";

class RunMigrationsController {
  async handle(req: Request, res: Response) {
    try {
      const migrationsService = new RunMigrationsService();
      const migrations = await migrationsService.execute();
      return res.status(201).json(migrations);
    } catch (error) {
      const publicErrorObject = new ServiceError({
        message: "Erro na conexão com Banco ou na Query.",
        cause: error,
      });
      console.error(publicErrorObject);
      return res.status(publicErrorObject.statusCode).json(publicErrorObject);
    }
  }
}

export { RunMigrationsController };
