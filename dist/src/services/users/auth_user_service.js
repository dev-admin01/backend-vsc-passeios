"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthUserService {
    async execute({ email, password }) {
        const user = await prisma_1.default.user.findFirst({
            where: {
                email: {
                    equals: email,
                },
            },
        });
        if (!user) {
            const data = { email: "invalid" };
            return data;
        }
        const passwordMatch = await (0, bcrypt_1.compare)(password, user.password);
        if (!passwordMatch) {
            const data = { email: "invalid" };
            return data;
        }
        const token = (0, jsonwebtoken_1.sign)({
            name: user.name,
            email: user.email,
        }, process.env.JWT_SECRET, {
            subject: user.id_user,
            expiresIn: "30d",
        });
        return {
            id_user: user.id_user,
            name: user.name,
            email: user.email,
            id_position: user.id_position,
            token,
        };
    }
}
exports.AuthUserService = AuthUserService;
