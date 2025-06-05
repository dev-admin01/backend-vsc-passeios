-- CreateTable
CREATE TABLE "Midia" (
    "id_midia" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Midia_pkey" PRIMARY KEY ("id_midia")
);

-- CreateTable
CREATE TABLE "Coupons" (
    "id_coupons" TEXT NOT NULL,
    "coupon" VARCHAR(6) NOT NULL,
    "id_midia" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Coupons_pkey" PRIMARY KEY ("id_coupons")
);

-- CreateIndex
CREATE UNIQUE INDEX "Midia_description_key" ON "Midia"("description");

-- CreateIndex
CREATE UNIQUE INDEX "Coupons_coupon_key" ON "Coupons"("coupon");

-- AddForeignKey
ALTER TABLE "Coupons" ADD CONSTRAINT "Coupons_id_midia_fkey" FOREIGN KEY ("id_midia") REFERENCES "Midia"("id_midia") ON DELETE RESTRICT ON UPDATE CASCADE;
