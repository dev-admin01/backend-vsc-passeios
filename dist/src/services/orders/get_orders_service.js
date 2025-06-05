"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOrderService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const convert_currency_1 = require("../../shared/convert_currency");
class GetOrderService {
    async execute(id_order) {
        const order = await prisma_1.default.orders.findUnique({
            where: { id_order },
            select: {
                id_order: true,
                order_number: true,
                price: true,
                pre_name: true,
                pre_email: true,
                pre_ddi: true,
                pre_ddd: true,
                pre_phone: true,
                id_cond_pag: true,
                id_coupons: true,
                created_at: true,
                status: {
                    select: {
                        id_status_order: true,
                        description: true,
                    },
                },
                orders_service: {
                    select: {
                        id_order_service: true,
                        id_service: true,
                        discount: true,
                        price: true,
                        suggested_date: true,
                        quantity: true,
                        time: true,
                    },
                },
                cond_pag: {
                    select: {
                        id_cond_pag: true,
                        description: true,
                    },
                },
                coupons: {
                    select: {
                        id_coupons: true,
                        coupon: true,
                        discount: true,
                        id_midia: true,
                    },
                },
            },
        });
        order.price = convert_currency_1.ConvertCurrency.centsToReal(order.price);
        order.orders_service.forEach(service => {
            service.price = convert_currency_1.ConvertCurrency.centsToReal(service.price);
        });
        return order;
    }
}
exports.GetOrderService = GetOrderService;
