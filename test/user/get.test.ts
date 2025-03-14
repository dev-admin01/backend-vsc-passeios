describe("GET api/user", () => {
  test("with valid inputs", async () => {
    const response = await fetch("http://localhost:3000/api/user");

    const responseBody = await response.json();
    console.log(responseBody);
    expect(response.status).toBe(200);

    expect(responseBody.message).toBe("Alguma resposta em JSON");
  });
});
