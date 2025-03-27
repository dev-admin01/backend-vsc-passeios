-- DropForeignKey
ALTER TABLE "order_documentation" DROP CONSTRAINT "order_documentation_id_order_fkey";

-- DropForeignKey
ALTER TABLE "orders_history" DROP CONSTRAINT "orders_history_id_order_fkey";

-- AddForeignKey
ALTER TABLE "order_documentation" ADD CONSTRAINT "order_documentation_id_order_fkey" FOREIGN KEY ("id_order") REFERENCES "orders"("id_order") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders_history" ADD CONSTRAINT "orders_history_id_order_fkey" FOREIGN KEY ("id_order") REFERENCES "orders"("id_order") ON DELETE CASCADE ON UPDATE CASCADE;
