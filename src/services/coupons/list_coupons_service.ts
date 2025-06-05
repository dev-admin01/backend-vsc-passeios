import prismaClient from "../../prisma";

class ListCouponsService {
  async execute() {
    const coupons = await prismaClient.coupon.findMany({
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

    return coupons;
  }
}

export { ListCouponsService };
