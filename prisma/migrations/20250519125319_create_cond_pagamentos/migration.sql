/*
  Warnings:

  - Added the required column `discount` to the `Coupons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Coupons" ADD COLUMN     "discount" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Condicao_Pagamento" (
    "id_cond_pag" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "installments" VARCHAR(2) NOT NULL,
    "discount" VARCHAR(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Condicao_Pagamento_pkey" PRIMARY KEY ("id_cond_pag")
);

-- CreateIndex
CREATE UNIQUE INDEX "Condicao_Pagamento_description_key" ON "Condicao_Pagamento"("description");
