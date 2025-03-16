"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteServiceService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class DeleteServiceService {
    async execute({ id }) {
        await prisma_1.default.service.delete({
            where: { id_service: id },
        });
    }
}
exports.DeleteServiceService = DeleteServiceService;
