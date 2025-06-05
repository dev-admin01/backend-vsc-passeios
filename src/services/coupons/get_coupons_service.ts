import prismaClient from "../../prisma";

class GetCouponsService {
  async execute(id: string) {
    const coupons = await prismaClient.coupon.findUnique({
      where: {
        id_coupons: id,
      },
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

    if (!coupons) {
      throw new Error("Cupom não encontrado");
    }

    return coupons;
  }
}

export { GetCouponsService };
