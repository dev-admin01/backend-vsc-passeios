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

    const lastOrder = await prismaClient.orders.findFirst({
      orderBy: { created_at: "desc" },
      select: { order_number: true },
    });

    let sequence = 1;
    if (lastOrder && lastOrder.order_number) {
      const lastSequence = parseInt(lastOrder.order_number.substring(0, 4));
      if (!isNaN(lastSequence)) {
        sequence = lastSequence + 1;
      } else {
        sequence = 1;
      }
    }
    const sequenceStr = sequence.toString().padStart(4, "0");

    const now = new Date();
    const monthStr = (now.getMonth() + 1).toString().padStart(2, "0");
    const yearStr = now.getFullYear().toString().slice(-2);

    const orderNumber = `${sequenceStr}${monthStr}${yearStr}`;

    const orderData = {
      id_user: userRespBody.user.id_user,
      order_number: orderNumber,
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

    const orderResp = await fetch("http://localhost:3000/api/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${userRespBody.user.token}`,
      },
      body: JSON.stringify(orderData),
    });

    expect(orderResp.status).toBe(201);

    const orderRespBody = await orderResp.json();

    expect(orderRespBody.order).toEqual({
      id_order: orderRespBody.order.id_order,
      id_user: userRespBody.user.id_user,
      id_status_order: statusRespBody.status_order.id_status_order,
      order_number: orderNumber,
      price: "1500.91",
      pre_name: "cliente teste jest",
      pre_email: "jest@teste.com",
      pre_ddi: "55",
      pre_ddd: "11",
      pre_phone: "999999999",
      created_at: orderRespBody.order.created_at,
      orders_service: [
        {
          id_order_service:
            orderRespBody.order.orders_service[0].id_order_service,
          id_order: orderRespBody.order.id_order,
          id_service: serviceRespBody.service.id_service,
          discount: "105.15",
          price: "999.99",
          suggested_date: "2025-03-18T12:00:00.000Z",
        },
      ],
    });
  }, 20000);
});
