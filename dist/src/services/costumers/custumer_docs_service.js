"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrderDocsService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class UpdateOrderDocsService {
    async execute({ id_order, cpf_cnpj, passaporte, nome, email, ddi, ddd, telefone, compPag, cnh, }) {
        const costumer = await prisma_1.default.costumer.create({
            data: {
                nome,
                email,
                cpf_cnpj,
                passaporte,
                ddi,
                ddd,
                telefone,
            },
            select: {
                id_costumer: true,
            },
        });
        await prisma_1.default.orders.update({
            where: { id_order },
            data: {
                id_costumer: costumer.id_costumer,
                id_status_order: 6,
            },
        });
        const docsToCreate = [
            {
                id_order,
                name: "comp. pagamento",
                file: compPag,
            },
        ];
        if (cnh) {
            docsToCreate.push({
                id_order,
                name: "CNH",
                file: cnh,
            });
        }
        await prisma_1.default.order_documentation.createMany({
            data: docsToCreate,
        });
        await prisma_1.default.orders_history.create({
            data: {
                id_order,
                id_status_order: 6,
            },
        });
    }
}
exports.UpdateOrderDocsService = UpdateOrderDocsService;
