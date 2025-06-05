/*
  Warnings:

  - You are about to drop the `Condicao_Pagamento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Coupons` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Midia` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Coupons" DROP CONSTRAINT "Coupons_id_midia_fkey";

-- DropTable
DROP TABLE "Condicao_Pagamento";

-- DropTable
DROP TABLE "Coupons";

-- DropTable
DROP TABLE "Midia";

-- CreateTable
CREATE TABLE "midias" (
    "id_midia" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "midias_pkey" PRIMARY KEY ("id_midia")
);

-- CreateTable
CREATE TABLE "coupons" (
    "id_coupons" TEXT NOT NULL,
    "coupon" VARCHAR(6) NOT NULL,
    "discount" TEXT NOT NULL,
    "id_midia" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "coupons_pkey" PRIMARY KEY ("id_coupons")
);

-- CreateTable
CREATE TABLE "condicao_pagamentos" (
    "id_cond_pag" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "installments" VARCHAR(2) NOT NULL,
    "discount" VARCHAR(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "condicao_pagamentos_pkey" PRIMARY KEY ("id_cond_pag")
);

-- CreateIndex
CREATE UNIQUE INDEX "midias_description_key" ON "midias"("description");

-- CreateIndex
CREATE UNIQUE INDEX "coupons_coupon_key" ON "coupons"("coupon");

-- CreateIndex
CREATE UNIQUE INDEX "condicao_pagamentos_description_key" ON "condicao_pagamentos"("description");

-- AddForeignKey
ALTER TABLE "coupons" ADD CONSTRAINT "coupons_id_midia_fkey" FOREIGN KEY ("id_midia") REFERENCES "midias"("id_midia") ON DELETE RESTRICT ON UPDATE CASCADE;
