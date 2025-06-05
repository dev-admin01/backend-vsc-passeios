import prismaClient from "../../prisma";

class GetDocsValidationService {
  async execute(orderId: string) {
    const docsValidation = await prismaClient.order_documentation.findMany({
      where: { id_order: orderId },
      select: {
        id_order_documentation: true,
        name: true,
        file: true,
      },
    });

    return docsValidation;
  }
}

export { GetDocsValidationService };
