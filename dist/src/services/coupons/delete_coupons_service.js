"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCouponsService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class DeleteCouponsService {
    async execute(id) {
        const coupons = await prisma_1.default.coupon.delete({
            where: {
                id_coupons: id,
            },
        });
        return coupons;
    }
}
exports.DeleteCouponsService = DeleteCouponsService;
