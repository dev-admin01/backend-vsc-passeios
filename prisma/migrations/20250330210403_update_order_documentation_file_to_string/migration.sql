/*
  Warnings:

  - Made the column `file` on table `order_documentation` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "order_documentation" ALTER COLUMN "file" SET NOT NULL,
ALTER COLUMN "file" SET DATA TYPE TEXT;
