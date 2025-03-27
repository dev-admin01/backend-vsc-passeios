import orchestrator from "../../orchestrator";
import prismaClient from "../../../src/prisma";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
}, 20000);

describe("POST /api/orders", () => {
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

    const servicesData = {
      description: "servico teste18",
      type: "0",
      price: "100.25",
      observation: "observacao teste texto bem grande mmesmoa e uma observacao",
    };

    const serviceResp = await fetch("http://localhost:3000/api/services", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${userRespBody.user.token}`,
      },
      body: JSON.stringify(servicesData),
    });

    const serviceRespBody = await serviceResp.json();

    const statusData = {
      description: "status teste jest",
    };

    const statusResp = await fetch("http://localhost:3000/api/order-status", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${userRespBody.user.token}`,
      },
      body: JSON.stringify(statusData),
    });

    const statusRespBody = await statusResp.json();

    const orderData = {
      id_user: userRespBody.user.id_user,
      price: 1500.91,
      pre_name: "cliente teste jest",
      pre_email: "jest@teste.com",
      pre_ddi: "55",
      pre_ddd: "11",
      pre_phone: "999999999",
      services: [
        {
          id_service: serviceRespBody.service.id_service,
          discount: 105.15,
          price: 999.99,
          suggested_date: "2025-03-18T12:00:00.000Z",
        },
      ],
    };

    const orderResp = await fetch("http://localhost:3000/api/orders/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${userRespBody.user.token}`,
      },
      body: JSON.stringify(orderData),
    });

    expect(orderResp.status).toBe(201);

    const orderRespBody = await orderResp.json();

    const deleteResp = await fetch(
      `http://localhost:3000/api/orders/${orderRespBody.order.id_order}`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${userRespBody.user.token}`,
        },
        body: JSON.stringify(orderData),
      },
    );

    expect(deleteResp.status).toBe(200);

    const deleteRespBody = await deleteResp.json();

    expect(deleteRespBody).toEqual({
      message: "Order deleted successfully",
      status_code: 200,
    });
  }, 20000);
});
