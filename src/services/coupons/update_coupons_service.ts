import prismaClient from "../../prisma";

interface UpdateCouponsType {
  coupon: string;
  discount: string;
  id_midia: number;
}

class UpdateCouponsService {
  async execute(id: string, { coupon, discount, id_midia }: UpdateCouponsType) {
    const coupons = await prismaClient.coupon.update({
      where: {
        id_coupons: id,
      },
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

export { UpdateCouponsService };
