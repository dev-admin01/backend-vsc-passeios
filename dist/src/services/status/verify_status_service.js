"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyStatusService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class VerifyStatusService {
    async execute() {
        const updatedAt = new Date().toISOString();
        // Versão do banco
        const [databaseVersionResult] = await prisma_1.default.$queryRawUnsafe("SHOW server_version;");
        const databaseVersionValue = databaseVersionResult.server_version;
        // Máximo de conexões
        const [databaseMaxConnectionsResult] = await prisma_1.default.$queryRawUnsafe("SHOW max_connections;");
        const databaseMaxConnectionsValue = parseInt(databaseMaxConnectionsResult.max_connections);
        // Conexões ativas
        const databaseName = process.env.POSTGRES_DB;
        // Usando .concat para evitar interpolar valores diretamente na query:
        const queryConnections = `
      SELECT count(*)::int AS count
      FROM pg_stat_activity
      WHERE datname = $1;
    `;
        const [databaseOpenedConnectionResult] = await prisma_1.default.$queryRawUnsafe(queryConnections, databaseName);
        const databaseOpenedConnectionValue = databaseOpenedConnectionResult.count;
        // Monta o objeto de retorno
        return {
            updated_at: updatedAt,
            dependencies: {
                database: {
                    version: databaseVersionValue,
                    max_connections: databaseMaxConnectionsValue,
                    opened_connections: databaseOpenedConnectionValue,
                },
            },
        };
    }
}
exports.VerifyStatusService = VerifyStatusService;
