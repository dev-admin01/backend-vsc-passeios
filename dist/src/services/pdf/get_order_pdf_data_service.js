"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOrderPDFDataService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const convert_currency_1 = require("../../shared/convert_currency");
class GetOrderPDFDataService {
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
                created_at: true,
                orders_service: {
                    select: {
                        id_order_service: true,
                        id_service: true,
                        discount: true,
                        price: true,
                        suggested_date: true,
                        quantity: true,
                        time: true,
                        service: {
                            select: {
                                description: true,
                            },
                        },
                    },
                },
                cond_pag: {
                    select: {
                        description: true,
                        installments: true,
                        discount: true,
                    },
                },
                coupons: {
                    select: {
                        coupon: true,
                        discount: true,
                    },
                },
            },
        });
        order.price = convert_currency_1.ConvertCurrency.centsToReal(order.price);
        order.orders_service.forEach(service => {
            service.price = convert_currency_1.ConvertCurrency.centsToReal(service.price);
        });
        const condPag = await prisma_1.default.condicao_Pagamento.findFirst({
            where: {
                description: {
                    equals: "Pix",
                    mode: "insensitive",
                },
            },
            select: {
                description: true,
                installments: true,
                discount: true,
            },
        });
        const pdfData = {
            order: order,
            condPag: condPag,
        };
        return pdfData;
    }
}
exports.GetOrderPDFDataService = GetOrderPDFDataService;
