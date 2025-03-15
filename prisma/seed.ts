import { PrismaClient } from "@prisma/client";

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
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
