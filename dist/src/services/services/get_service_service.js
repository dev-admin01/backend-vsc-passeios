"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetServiceService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const convert_currency_1 = require("../../shared/convert_currency");
class GetServiceService {
    async execute({ id }) {
        const service = await prisma_1.default.service.findUnique({
            where: { id_service: id },
            select: {
                id_service: true,
                description: true,
                type: true,
                price: true,
                time: true,
                observation: true,
                created_at: true,
                updated_at: true,
            },
        });
        service.price = convert_currency_1.ConvertCurrency.centsToReal(service.price);
        console.log(service.price);
        return service;
    }
}
exports.GetServiceService = GetServiceService;
