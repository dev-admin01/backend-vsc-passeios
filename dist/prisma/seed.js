"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = require("bcrypt");
const prisma = new client_1.PrismaClient();
async function main() {
    await prisma.position.createMany({
        data: [
            { description: "manager" },
            { description: "Admin" },
            { description: "seller" },
            { description: "operator" },
        ],
        // Caso já existam dados, esse parâmetro evita duplicatas
        skipDuplicates: true,
    });
    const password = "senha123";
    const passwordHash = await (0, bcrypt_1.hash)(password, 8);
    await prisma.user.createMany({
        data: [
            {
                name: "teste",
                email: "teste@teste.com",
                password: passwordHash,
                id_position: 1,
                ddi: "55",
                ddd: "11",
                phone: "999999999",
            },
        ],
        // Caso já existam dados, esse parâmetro evita duplicatas
        skipDuplicates: true,
    });
    await prisma.orders_status.createMany({
        data: [
            { description: "Aguardando envio" },
            { description: "Enviado ao Cliente" },
            { description: "Comprovante Recebidos" },
        ],
        skipDuplicates: true,
    });
}
main()
    .catch(e => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
