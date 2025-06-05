import orchestrator from "../../orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
}, 20000);

describe("POST /api/services", () => {
  describe("should service a user", () => {
    describe("Valid inputs", () => {
      async function createValidUser() {
        const response = await fetch("http://localhost:3000/api/auth", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            email: "teste@teste.com",
            password: "senha123",
          }),
        });

        const responseBody = await response.json();

        return responseBody;
      }

      test("Preço em centena", async () => {
        const responseBody1 = await createValidUser();

        const service = {
          description: "servico teste",
          type: "0",
          price: "100,25",
          observation:
            "observacao teste texto bem grande mmesmoa e uma observacao",
          time: ["13:30", "14:00", "14:30", "15:00", "15:30", "16:00"],
        };

        const response = await fetch("http://localhost:3000/api/services", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${responseBody1.user.token}`,
          },
          body: JSON.stringify(service),
        });

        const responseBody = await response.json();

        expect(responseBody.service).toEqual({
          id_service: responseBody.service.id_service,
          description: "servico teste",
          type: "0",
          price: "100,25",
          observation:
            "observacao teste texto bem grande mmesmoa e uma observacao",
          time: '["13:30","14:00","14:30","15:00","15:30","16:00"]',
          created_at: responseBody.service.created_at,
          updated_at: responseBody.service.updated_at,
        });

        expect(Date.parse(responseBody.service.created_at)).not.toBeNaN();
        expect(Date.parse(responseBody.service.updated_at)).not.toBeNaN();
      }, 20000);

      test("Preço em milhar", async () => {
        const responseBody1 = await createValidUser();

        const service = {
          description: "servico teste",
          type: "0",
          price: "2.503,97",
          observation:
            "observacao teste texto bem grande mmesmoa e uma observacao",
          time: ["13:30", "14:00", "14:30", "15:00", "15:30", "16:00"],
        };

        const response = await fetch("http://localhost:3000/api/services", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${responseBody1.user.token}`,
          },
          body: JSON.stringify(service),
        });

        const responseBody = await response.json();

        expect(responseBody.service).toEqual({
          id_service: responseBody.service.id_service,
          description: "servico teste",
          type: "0",
          price: "2503,97",
          observation:
            "observacao teste texto bem grande mmesmoa e uma observacao",
          time: '["13:30","14:00","14:30","15:00","15:30","16:00"]',
          created_at: responseBody.service.created_at,
          updated_at: responseBody.service.updated_at,
        });

        expect(Date.parse(responseBody.service.created_at)).not.toBeNaN();
        expect(Date.parse(responseBody.service.updated_at)).not.toBeNaN();
      }, 20000);
    });
  });
});
