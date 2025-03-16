"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetServiceService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class GetServiceService {
    async execute({ id }) {
        const service = await prisma_1.default.service.findUnique({
            where: { id_service: id },
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
        return service;
    }
}
exports.GetServiceService = GetServiceService;
