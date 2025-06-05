import orchestrator from "../../orchestrator";
import prismaClient from "../../../src/prisma";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
}, 20000);

describe("DELETE /api/cond_pagamento", () => {
  test("with valid inputs", async () => {
    const userResp = await fetch("http://localhost:3000/api/auth", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: "teste@teste.com",
        password: "senha123",
      }),
    });

    const userRespBody = await userResp.json();

    const condPagData = {
      description: "Pix",
      installments: "1",
      discount: "10",
    };

    // CRIA A COND. PAGAMENTO
    const response1 = await fetch(
      "http://localhost:3000/api/condicao-pagamento",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${userRespBody.user.token}`,
        },
        body: JSON.stringify(condPagData),
      },
    );

    const responseBody1 = await response1.json();

    const response = await fetch(
      `http://localhost:3000/api/condicao-pagamento/${responseBody1.condicaoPagamento.id_cond_pag}`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${userRespBody.user.token}`,
        },
      },
    );

    const responseBody = await response.json();

    expect(response.status).toBe(200);

    expect(responseBody).toEqual({
      message: "Condição de pagamento excluída com sucesso",
      status_code: 200,
    });
  }, 20000);
});
