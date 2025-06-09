-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "hotel" TEXT,
ADD COLUMN     "hotel_checkin" TIMESTAMP(3),
ADD COLUMN     "hotel_checkout" TIMESTAMP(3);
