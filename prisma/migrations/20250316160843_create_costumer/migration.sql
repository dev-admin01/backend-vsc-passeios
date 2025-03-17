-- CreateTable
CREATE TABLE "costumer" (
    "id_costumer" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf_cnpj" TEXT,
    "passaporte" TEXT,
    "razao_social" TEXT,
    "nome_fantasia" TEXT,
    "ddi" TEXT,
    "ddd" TEXT,
    "telefone" TEXT,
    "indicacao" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "costumer_pkey" PRIMARY KEY ("id_costumer")
);
