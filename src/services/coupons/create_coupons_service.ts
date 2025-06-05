import prismaClient from "../../prisma";

interface CouponsType {
  coupon: string;
  discount: string;
  id_midia: number;
}

class CreateCouponsService {
  async execute({ coupon, discount, id_midia }: CouponsType) {
    const coupons = await prismaClient.coupon.create({
      data: {
        coupon,
        discount,
        id_midia,
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

    return coupons;
  }
}

export { CreateCouponsService };
