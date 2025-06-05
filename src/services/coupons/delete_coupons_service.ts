import prismaClient from "../../prisma";

class DeleteCouponsService {
  async execute(id: string) {
    const coupons = await prismaClient.coupon.delete({
      where: {
        id_coupons: id,
      },
    });

    return coupons;
  }
}

export { DeleteCouponsService };
