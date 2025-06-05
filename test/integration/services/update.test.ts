import orchestrator from "../../orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
}, 20000);

describe("GET /api/services", () => {
  test("should service a user", async () => {
    const authResponse = await fetch("http://localhost:3000/api/auth", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: "teste@teste.com",
        password: "senha123",
      }),
    });

    const rauthesponseBody = await authResponse.json();

    // cria o service
    const service = {
      description: "servico teste",
      type: "0",
      price: "100,25",
      observation: "observacao teste texto bem grande mmesmoa e uma observacao",
      time: ["13:30", "14:00", "14:30", "15:00", "15:30", "16:00"],
    };

    const response2 = await fetch("http://localhost:3000/api/services", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${rauthesponseBody.user.token}`,
      },
      body: JSON.stringify(service),
    });

    const responseBody2 = await response2.json();

    // atualiza o sercive

    const serviceUpdated = {
      description: "servico teste atualizado",
      type: "1",
      price: "1.500,99",
      observation:
        "observacao teste texto bem grande mmesmoa e uma observacao atualizada",
      time: ["08:00", "09:00", "10:00", "11:00"],
    };

    const response = await fetch(
      `http://localhost:3000/api/services/${responseBody2.service.id_service}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${rauthesponseBody.user.token}`,
        },
        body: JSON.stringify(serviceUpdated),
      },
    );

    const responseBody = await response.json();

    expect(response.status).toBe(200);

    expect(responseBody).toEqual({
      message: "Passeio Atualizado com sucesso!",
      service: {
        id_service: responseBody2.service.id_service,
        description: "servico teste atualizado",
        type: "1",
        price: "150099",
        observation:
          "observacao teste texto bem grande mmesmoa e uma observacao atualizada",
        time: '["08:00","09:00","10:00","11:00"]',
        created_at: responseBody2.service.created_at,
        updated_at: responseBody2.service.updated_at,
      },
      status_code: 200,
    });

    expect(Date.parse(responseBody.service.created_at)).not.toBeNaN();
    expect(Date.parse(responseBody.service.updated_at)).not.toBeNaN();
  }, 20000);
});
