-- CreateTable
CREATE TABLE "orders" (
    "id_order" TEXT NOT NULL,
    "id_costumer" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "price" DECIMAL(10,2),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_status_order" INTEGER,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id_order")
);

-- CreateTable
CREATE TABLE "orders_service" (
    "id_order_service" SERIAL NOT NULL,
    "id_order" TEXT NOT NULL,
    "id_service" INTEGER NOT NULL,
    "suggested_date" TIMESTAMP(3),
    "price" DECIMAL(10,2),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orders_service_pkey" PRIMARY KEY ("id_order_service")
);

-- CreateTable
CREATE TABLE "order_documentation" (
    "id_order_documentation" SERIAL NOT NULL,
    "id_order" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_documentation_pkey" PRIMARY KEY ("id_order_documentation")
);

-- CreateTable
CREATE TABLE "orders_history" (
    "id_order_history" SERIAL NOT NULL,
    "id_order" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orders_history_pkey" PRIMARY KEY ("id_order_history")
);

-- CreateTable
CREATE TABLE "orders_status" (
    "id_status_order" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orders_status_pkey" PRIMARY KEY ("id_status_order")
);

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_id_costumer_fkey" FOREIGN KEY ("id_costumer") REFERENCES "costumer"("id_costumer") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_id_status_order_fkey" FOREIGN KEY ("id_status_order") REFERENCES "orders_status"("id_status_order") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders_service" ADD CONSTRAINT "orders_service_id_order_fkey" FOREIGN KEY ("id_order") REFERENCES "orders"("id_order") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders_service" ADD CONSTRAINT "orders_service_id_service_fkey" FOREIGN KEY ("id_service") REFERENCES "services"("id_service") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_documentation" ADD CONSTRAINT "order_documentation_id_order_fkey" FOREIGN KEY ("id_order") REFERENCES "orders"("id_order") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders_history" ADD CONSTRAINT "orders_history_id_order_fkey" FOREIGN KEY ("id_order") REFERENCES "orders"("id_order") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders_history" ADD CONSTRAINT "orders_history_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;
