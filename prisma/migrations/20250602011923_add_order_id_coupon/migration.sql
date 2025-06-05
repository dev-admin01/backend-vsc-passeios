/*
  Warnings:

  - Added the required column `id_coupons` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "id_coupons" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_id_coupons_fkey" FOREIGN KEY ("id_coupons") REFERENCES "coupons"("id_coupons") ON DELETE RESTRICT ON UPDATE CASCADE;
