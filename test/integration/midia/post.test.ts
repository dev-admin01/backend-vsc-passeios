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

    const midiaData = {
      description: "Midia teste",
    };

    const response = await fetch("http://localhost:3000/api/midia", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${userRespBody.user.token}`,
      },
      body: JSON.stringify(midiaData),
    });

    const responseBody = await response.json();

    console.log(responseBody);

    expect(response.status).toBe(201);

    expect(responseBody).toEqual({
      message: "Mídia criada com sucesso",
      midia: {
        id_midia: responseBody.midia.id_midia,
        description: "Midia teste",
        created_at: responseBody.midia.created_at,
        updated_at: responseBody.midia.updated_at,
      },
      status_code: 201,
    });
  }, 20000);
});
