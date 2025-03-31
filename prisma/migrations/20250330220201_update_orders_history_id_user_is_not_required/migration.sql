-- DropForeignKey
ALTER TABLE "orders_history" DROP CONSTRAINT "orders_history_id_user_fkey";

-- AlterTable
ALTER TABLE "orders_history" ALTER COLUMN "id_user" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "orders_history" ADD CONSTRAINT "orders_history_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id_user") ON DELETE SET NULL ON UPDATE CASCADE;
