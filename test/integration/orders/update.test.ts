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
          discount: 0,
          price: 295.99,
          suggested_date: "2025-03-18T12:00:00.000Z",
        },
        {
          id_service: serviceRespBody.service.id_service,
          discount: 100.95,
          price: 1000.99,
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

    const orderRespBody = await orderResp.json();

    console.log("order:", orderRespBody);

    console.log("order_Service:", orderRespBody.order.orders_service[0]);

    //////  UPDATE ///////

    const updateOrderData = {
      id_order: orderRespBody.order.id_order,
      id_user: userRespBody.user.id_user,
      id_costumer: null,
      price: 1295.95,
      pre_name: "cliente teste jest",
      pre_email: "jest@teste.com",
      pre_ddi: "55",
      pre_ddd: "11",
      pre_phone: "999999999",
      services: [
        {
          id_order_service:
            orderRespBody.order.orders_service[0].id_order_service,
          id_service: serviceRespBody.service.id_service,
          discount: 0,
          price: 295,
          suggested_date: "2025-03-18T12:00:00.000Z",
        },
        {
          id_order_service:
            orderRespBody.order.orders_service[1].id_order_service,
          id_service: serviceRespBody.service.id_service,
          discount: 100.95,
          price: 1000.99,
          suggested_date: "2025-03-18T12:00:00.000Z",
        },
      ],
    };

    const updateResp = await fetch(
      `http://localhost:3000/api/orders/${orderRespBody.order.id_order}`,
      {
        method: "put",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${userRespBody.user.token}`,
        },
        body: JSON.stringify(updateOrderData),
      },
    );

    expect(updateResp.status).toBe(200);

    const updateRespBody = await updateResp.json();

    console.log(updateRespBody);

    expect(updateRespBody.order).toEqual({
      id_order: orderRespBody.order.id_order,
      costumer: null,
      order_number: orderRespBody.order.order_number,
      price: "1295.95",
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
          discount: "0",
          price: "295",
          suggested_date: "2025-03-18T12:00:00.000Z",
        },
        {
          id_order_service:
            orderRespBody.order.orders_service[1].id_order_service,
          id_order: orderRespBody.order.id_order,
          id_service: serviceRespBody.service.id_service,
          discount: "100.95",
          price: "1000.99",
          suggested_date: "2025-03-18T12:00:00.000Z",
        },
      ],
      status: {
        description: "status teste jest",
        id_status_order: statusRespBody.status_order.id_status_order,
      },
    });
  }, 20000);
});
