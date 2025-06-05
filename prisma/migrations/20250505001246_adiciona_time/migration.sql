/*
  Warnings:

  - Added the required column `time` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `services` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "time" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "services" ADD COLUMN     "time" TEXT NOT NULL;
