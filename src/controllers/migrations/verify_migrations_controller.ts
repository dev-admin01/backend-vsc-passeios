import { Request, Response } from "express";
import { VerifyMigrationsService } from "../../services/migrations/verify_migrations_service";
import { ServiceError } from "../../shared/erros";

class VerifyMigrationsController {
  async handle(req: Request, res: Response) {
    try {
      const migrationsService = new VerifyMigrationsService();
      const migrations = await migrationsService.execute();

      return res.status(200).json({
        migrations,
      });
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

export { VerifyMigrationsController };
