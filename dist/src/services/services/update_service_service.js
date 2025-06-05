"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateServiceService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const convert_currency_1 = require("../../shared/convert_currency");
class UpdateServiceService {
    async execute({ id_service, description, type, price, time, observation, }) {
        const priceCents = convert_currency_1.ConvertCurrency.realToCents(price);
        console.log(id_service);
        console.log(description);
        console.log(type);
        console.log(priceCents);
        console.log(observation);
        console.log(time);
        console.log(typeof time);
        const timeString = Array.isArray(time) ? JSON.stringify(time) : time;
        const updatedService = await prisma_1.default.service.update({
            where: { id_service },
            data: {
                description,
                type,
                price: priceCents,
                time: timeString,
                observation,
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
        return updatedService;
    }
}
exports.UpdateServiceService = UpdateServiceService;
function realToCents(price) {
    throw new Error("Function not implemented.");
}
