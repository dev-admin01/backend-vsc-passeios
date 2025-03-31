/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `costumer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[passaporte]` on the table `costumer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `costumer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "costumer" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "costumer_email_key" ON "costumer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "costumer_passaporte_key" ON "costumer"("passaporte");
