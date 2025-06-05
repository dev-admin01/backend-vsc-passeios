"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCouponsService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class GetCouponsService {
    async execute(id) {
        const coupons = await prisma_1.default.coupon.findUnique({
            where: {
                id_coupons: id,
            },
            select: {
                id_coupons: true,
                coupon: true,
                discount: true,
                id_midia: true,
                created_at: true,
                midia: {
                    select: {
                        id_midia: true,
                        description: true,
                    },
                },
            },
        });
        if (!coupons) {
            throw new Error("Cupom não encontrado");
        }
        return coupons;
    }
}
exports.GetCouponsService = GetCouponsService;
