"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDocsValidationService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class GetDocsValidationService {
    async execute(orderId) {
        const docsValidation = await prisma_1.default.order_documentation.findMany({
            where: { id_order: orderId },
            select: {
                id_order_documentation: true,
                name: true,
                file: true,
            },
        });
        return docsValidation;
    }
}
exports.GetDocsValidationService = GetDocsValidationService;
