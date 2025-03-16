"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListServiceService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const client_1 = require("@prisma/client");
class ListServiceService {
    async execute({ search, page, perpage }) {
        const skip = (page - 1) * perpage;
        // Onde criamos a condição de busca
        const whereCondition = search
            ? {
                OR: [
                    {
                        description: {
                            contains: search,
                            // Aqui usamos a enum do Prisma no lugar de "insensitive"
                            mode: client_1.Prisma.QueryMode.insensitive,
                        },
                    },
                    {
                        observation: {
                            contains: search,
                            mode: client_1.Prisma.QueryMode.insensitive,
                        },
                    },
                    {
                        type: {
                            contains: search,
                            mode: client_1.Prisma.QueryMode.insensitive,
                        },
                    },
                ],
            }
            : {};
        const totalCount = await prisma_1.default.service.count({
            where: whereCondition,
        });
        const lastPage = Math.ceil(totalCount / perpage);
        const services = await prisma_1.default.service.findMany({
            where: whereCondition,
            skip,
            take: perpage,
            select: {
                id_service: true,
                description: true,
                type: true,
                price: true,
                observation: true,
                created_at: true,
                updated_at: true,
            },
        });
        return {
            services,
            page,
            perpage,
            lastPage,
            totalCount,
        };
    }
}
exports.ListServiceService = ListServiceService;
