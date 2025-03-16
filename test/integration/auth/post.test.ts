import { version as uuidVersion } from "uuid";
import orchestrator from "../../orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

afterEach(async () => {
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("POST api/auth", () => {
  test("with valid data", async () => {
    let user = {
      name: "teste123",
      email: "testando@teste.com",
      password: "senha123",
      id_position: 1,
      ddi: "55",
      ddd: "11",
      phone: "999995555",
    };
    const response = await fetch("http://localhost:3000/api/user", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const responseBody = await response.json();

    const response1 = await fetch("http://localhost:3000/api/auth", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: "testando@teste.com",
        password: "senha123",
      }),
    });

    expect(response1.status).toBe(200);

    const responseBody1 = await response1.json();
    expect(uuidVersion(responseBody1.user.id_user)).toBe(4);

    expect(responseBody1.user).toMatchObject({
      id_user: responseBody.user.id_user,
      name: "teste123",
      email: "testando@teste.com",
      id_position: 1,
    });
  });

  test("with invalid data", async () => {
    let user = {
      name: "teste123",
      email: "testando@teste.com",
      password: "senha123",
      id_position: 1,
      ddi: "55",
      ddd: "11",
      phone: "999995555",
    };
    const response = await fetch("http://localhost:3000/api/user", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const response1 = await fetch("http://localhost:3000/api/auth", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: "testando@teste.com",
        password: "senhaerrada123",
      }),
    });

    expect(response1.status).toBe(400);

    const responseBody1 = await response1.json();

    expect(responseBody1).toMatchObject({
      message: "Usuário ou Senha inválidos.",
      status_code: 400,
    });
  });
});
