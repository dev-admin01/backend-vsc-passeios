/*
  Warnings:

  - A unique constraint covering the columns `[description]` on the table `orders_status` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "orders_status_description_key" ON "orders_status"("description");
