import orchestrator from "../../orchestrator";
import { CreateOrderService } from "../../../src/services/orders/create_orders_service";

import { ICreateOrderService } from "../../../src/types/order.type";

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

    const orderData: ICreateOrderService = {
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
        {
          id_service: serviceRespBody.service.id_service,
          discount: 105.15,
          price: 1000.99,
          suggested_date: "2025-03-18T12:00:00.000Z",
        },
      ],
    };

    const createService = new CreateOrderService();
    const order = await createService.execute(orderData);

    const listResp = await fetch(
      "http://localhost:3000/api/orders?page=1&perpage=10&search=",
      {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${userRespBody.user.token}`,
        },
      },
    );

    expect(listResp.status).toBe(200);

    const listRespBody = await listResp.json();

    expect(listRespBody.orders[0]).toEqual({
      id_order: order?.id_order,
      user: {
        id_user: userRespBody.user.id_user,
        name: userRespBody.user.name,
      },
      status: {
        id_status_order: statusRespBody.status_order.id_status_order,
        description: "status teste jest",
      },
      order_number: order?.order_number,
      costumer: null,
      price: "1500.91",
      pre_name: "cliente teste jest",
      pre_email: "jest@teste.com",
      pre_ddi: "55",
      pre_ddd: "11",
      pre_phone: "999999999",
      created_at: order?.created_at.toISOString(),
      orders_service: [
        {
          id_order_service:
            listRespBody.orders[0].orders_service[0].id_order_service,
          id_service: serviceRespBody.service.id_service,
          discount: "105.15",
          price: "999.99",
          suggested_date: "2025-03-18T12:00:00.000Z",
          service: {
            description: serviceRespBody.service.description,
          },
        },
        {
          id_order_service:
            listRespBody.orders[0].orders_service[1].id_order_service,
          id_service: serviceRespBody.service.id_service,
          discount: "105.15",
          price: "1000.99",
          suggested_date: "2025-03-18T12:00:00.000Z",
          service: {
            description: serviceRespBody.service.description,
          },
        },
      ],
    });
  }, 20000);
});
