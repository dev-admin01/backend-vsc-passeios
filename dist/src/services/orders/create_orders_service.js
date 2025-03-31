"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CreateOrderService {
    async execute({ id_user, price, services = [], pre_name, pre_email, pre_ddi, pre_ddd, pre_phone, }) {
        const lastOrder = await prisma_1.default.orders.findFirst({
            orderBy: { created_at: "desc" },
            select: { order_number: true },
        });
        let sequence = 1;
        if (lastOrder && lastOrder.order_number) {
            const lastSequence = parseInt(lastOrder.order_number.substring(0, 4));
            if (!isNaN(lastSequence)) {
                sequence = lastSequence + 1;
            }
            else {
                sequence = 1;
            }
        }
        const sequenceStr = sequence.toString().padStart(4, "0");
        const now = new Date();
        const monthStr = (now.getMonth() + 1).toString().padStart(2, "0");
        const yearStr = now.getFullYear().toString().slice(-2);
        const orderNumber = `${sequenceStr}${monthStr}${yearStr}`;
        const order = await prisma_1.default.orders.create({
            data: {
                id_user,
                order_number: orderNumber,
                price,
                id_status_order: 1,
                pre_name,
                pre_email,
                pre_ddi,
                pre_ddd,
                pre_phone,
            },
        });
        // 2. Cria os registros em orders_service, se houver
        if (services.length > 0) {
            const serviceData = services.map(srv => ({
                id_order: order.id_order,
                id_service: srv.id_service,
                discount: srv.discount,
                price: srv.price,
                suggested_date: srv.suggested_date,
            }));
            await prisma_1.default.orders_service.createMany({ data: serviceData });
        }
        // 3. Registra a criação da order em orders_history
        await prisma_1.default.orders_history.create({
            data: {
                id_order: order.id_order,
                id_user,
                id_status_order: 1,
            },
        });
        const completeOrder = await prisma_1.default.orders.findUnique({
            where: { id_order: order.id_order },
            select: {
                id_order: true,
                id_user: true,
                id_status_order: true,
                order_number: true,
                pre_name: true,
                pre_email: true,
                pre_ddi: true,
                pre_ddd: true,
                pre_phone: true,
                price: true,
                created_at: true,
                orders_service: {
                    select: {
                        id_order_service: true,
                        id_order: true,
                        id_service: true,
                        discount: true,
                        price: true,
                        suggested_date: true,
                    },
                },
            },
        });
        return completeOrder;
    }
}
exports.CreateOrderService = CreateOrderService;
