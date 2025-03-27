-- DropForeignKey
ALTER TABLE "orders_service" DROP CONSTRAINT "orders_service_id_order_fkey";

-- DropForeignKey
ALTER TABLE "orders_service" DROP CONSTRAINT "orders_service_id_service_fkey";

-- AddForeignKey
ALTER TABLE "orders_service" ADD CONSTRAINT "orders_service_id_order_fkey" FOREIGN KEY ("id_order") REFERENCES "orders"("id_order") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders_service" ADD CONSTRAINT "orders_service_id_service_fkey" FOREIGN KEY ("id_service") REFERENCES "services"("id_service") ON DELETE RESTRICT ON UPDATE CASCADE;
