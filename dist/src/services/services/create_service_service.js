"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateServiceService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const convert_currency_1 = require("../../shared/convert_currency");
class CreateServiceService {
    async execute({ description, type, price, observation, time }) {
        const convertPrice = convert_currency_1.ConvertCurrency.realToCents(price);
        const timeString = Array.isArray(time) ? JSON.stringify(time) : time;
        const data = await prisma_1.default.service.create({
            data: {
                description,
                type,
                price: convertPrice,
                observation,
                time: timeString,
            },
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
        data.price = convert_currency_1.ConvertCurrency.centsToReal(data.price);
        return data;
    }
}
exports.CreateServiceService = CreateServiceService;
