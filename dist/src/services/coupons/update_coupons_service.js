"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCouponsService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class UpdateCouponsService {
    async execute(id, { coupon, discount, id_midia }) {
        const coupons = await prisma_1.default.coupon.update({
            where: {
                id_coupons: id,
            },
            data: {
                coupon,
                discount,
                id_midia,
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
        return coupons;
    }
}
exports.UpdateCouponsService = UpdateCouponsService;
