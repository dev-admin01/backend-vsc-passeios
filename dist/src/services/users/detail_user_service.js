"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailUserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class DetailUserService {
    async execute(id_user) {
        const user = await prisma_1.default.user.findFirst({
            where: {
                id_user: id_user,
            },
            select: {
                id_user: true,
                name: true,
                email: true,
                id_position: true,
            },
        });
        return user;
    }
}
exports.DetailUserService = DetailUserService;
