import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

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
  const passwordHash = await hash(password, 8);

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
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
