import path from "path";
import fs from "fs";
import { readdir } from "fs/promises";

class VerifyMigrationsService {
  async execute(): Promise<string[]> {
    const migrationsDir = path.join(process.cwd(), "prisma", "migrations");

    if (!fs.existsSync(migrationsDir)) {
      throw new Error(
        `Diretório de migrations não encontrado: ${migrationsDir}`,
      );
    }

    try {
      const allMigrations = await readdir(migrationsDir);
      return allMigrations;
    } catch (error) {
      throw error;
    }
  }
}

export { VerifyMigrationsService };
