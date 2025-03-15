describe("GET /api/status", () => {
  test("Whitout user", async () => {
    const response = await fetch("http://localhost:3000/api/status");

    expect(response.status).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.status.dependencies.database.version).toEqual("16.0");

    expect(responseBody.status.dependencies.database.max_connections).toEqual(
      100,
    );

    expect(
      responseBody.status.dependencies.database.opened_connections,
    ).toEqual(1);
  });
});
