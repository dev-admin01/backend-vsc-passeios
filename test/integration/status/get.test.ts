import orchestrator from "../../orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("GET /api/status", () => {
  test("Whitout user", async () => {
    const response = await fetch("http://localhost:3000/api/status");

    expect(response.status).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.status.dependencies.database.version).toEqual("16.0");

    expect(responseBody.status.dependencies.database.max_connections).toEqual(
      100,
    );
  });
});
