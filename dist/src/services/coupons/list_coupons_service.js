"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCouponsService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ListCouponsService {
    async execute() {
        const coupons = await prisma_1.default.coupon.findMany({
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
exports.ListCouponsService = ListCouponsService;
