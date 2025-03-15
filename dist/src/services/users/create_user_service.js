"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const bcrypt_1 = require("bcrypt");
class CreateUserService {
    async execute({ name, email, password, id_position, ddd, ddi, phone, }) {
        if (!email) {
            throw new Error("Email incorrect");
        }
        const normalizedEmail = email.toLowerCase();
        const userAlreadyExists = await prisma_1.default.user.findFirst({
            where: {
                email: {
                    equals: normalizedEmail,
                    mode: "insensitive",
                },
            },
        });
        if (userAlreadyExists) {
            const data = { email: "User already exists" };
            return data;
        }
        const passwordHash = await (0, bcrypt_1.hash)(password, 8);
        const data = await prisma_1.default.user.create({
            data: {
                name,
                email,
                password: passwordHash,
                id_position,
                ddd,
                ddi,
                phone,
            },
            select: {
                id_user: true,
                name: true,
                email: true,
                id_position: true,
                ddi: true,
                ddd: true,
                phone: true,
                created_at: true,
                updated_at: true,
            },
        });
        return data;
    }
}
exports.CreateUserService = CreateUserService;
