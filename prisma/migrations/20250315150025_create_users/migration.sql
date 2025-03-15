-- CreateTable
CREATE TABLE "users" (
    "id_user" TEXT NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "password" VARCHAR(72) NOT NULL,
    "id_position" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id_user")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_id_position_fkey" FOREIGN KEY ("id_position") REFERENCES "positions"("id_position") ON DELETE RESTRICT ON UPDATE CASCADE;
