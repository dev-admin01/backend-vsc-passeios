-- CreateTable
CREATE TABLE "users" (
    "id_user" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "password" VARCHAR(72) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id_user")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
