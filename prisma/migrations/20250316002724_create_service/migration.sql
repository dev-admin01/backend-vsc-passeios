-- CreateTable
CREATE TABLE "services" (
    "id_service" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "type" VARCHAR(1) NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "observation" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id_service")
);
