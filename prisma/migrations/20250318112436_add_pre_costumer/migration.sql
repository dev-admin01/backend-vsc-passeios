-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_id_costumer_fkey";

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "order_number" TEXT,
ADD COLUMN     "pre_ddd" TEXT,
ADD COLUMN     "pre_ddi" TEXT,
ADD COLUMN     "pre_email" TEXT,
ADD COLUMN     "pre_name" TEXT,
ADD COLUMN     "pre_phone" TEXT,
ALTER COLUMN "id_costumer" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_id_costumer_fkey" FOREIGN KEY ("id_costumer") REFERENCES "costumer"("id_costumer") ON DELETE SET NULL ON UPDATE CASCADE;
