-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_id_cond_pag_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_id_coupons_fkey";

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "id_cond_pag" DROP NOT NULL,
ALTER COLUMN "id_coupons" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_id_cond_pag_fkey" FOREIGN KEY ("id_cond_pag") REFERENCES "condicao_pagamentos"("id_cond_pag") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_id_coupons_fkey" FOREIGN KEY ("id_coupons") REFERENCES "coupons"("id_coupons") ON DELETE SET NULL ON UPDATE CASCADE;
