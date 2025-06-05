import orchestrator from "../../orchestrator";
import prismaClient from "../../../src/prisma";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
}, 20000);

describe("POST /api/cond_pagamento", () => {
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

    const response = await fetch(
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

    const responseBody = await response.json();

    console.log(responseBody);

    expect(response.status).toBe(201);

    expect(responseBody.condicaoPagamento).toEqual({
      id_cond_pag: responseBody.condicaoPagamento.id_cond_pag,
      description: "Pix",
      installments: "1",
      discount: "10",
      created_at: responseBody.condicaoPagamento.created_at,
      updated_at: responseBody.condicaoPagamento.updated_at,
    });
  }, 20000);
});
