/*
  Warnings:

  - Added the required column `id_cond_pag` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "id_cond_pag" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_id_cond_pag_fkey" FOREIGN KEY ("id_cond_pag") REFERENCES "condicao_pagamentos"("id_cond_pag") ON DELETE RESTRICT ON UPDATE CASCADE;
