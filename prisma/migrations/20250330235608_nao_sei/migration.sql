/*
  Warnings:

  - Added the required column `id_status_order` to the `orders_history` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders_history" ADD COLUMN     "id_status_order" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "orders_history" ADD CONSTRAINT "orders_history_id_status_order_fkey" FOREIGN KEY ("id_status_order") REFERENCES "orders_status"("id_status_order") ON DELETE RESTRICT ON UPDATE CASCADE;
