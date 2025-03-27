/*
  Warnings:

  - A unique constraint covering the columns `[cpf_cnpj]` on the table `costumer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[description]` on the table `positions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "costumer_cpf_cnpj_key" ON "costumer"("cpf_cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "positions_description_key" ON "positions"("description");
