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
      observation: "obs servico teste jest, obs servico teste jest, obs servico teste jest",
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
      `http://localhost:3000/api/orders?page=1&perpage=10&filter=${userRespBody.user.id_user}&search=`,
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
        id_status_order: 1,
        description: "Aguardando envio",
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

  test("with valid inputs and position seller", async () => {

    // Autenticar um usuário com a posição de manager para criar um novo pedido
    const userManagerResp = await fetch("http://localhost:3000/api/auth", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: "teste@teste.com",
        password: "senha123",
      }),
    });

    const userManagerRespBody = await userManagerResp.json();

    const servicesData1 = {
      description: "servico teste18",
      type: "0",
      price: "100.25",
      observation: "obs servico teste jest, obs servico teste jest, obs servico teste jest",
    };

    const serviceResp1 = await fetch("http://localhost:3000/api/services", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${userManagerRespBody.user.token}`,
      },
      body: JSON.stringify(servicesData1),
    });

    const serviceRespBody1 = await serviceResp1.json();    

    const orderData1: ICreateOrderService = {
      id_user: userManagerRespBody.user.id_user,
      price: 1500.91,
      pre_name: "cliente teste jest",
      pre_email: "jest@teste.com",
      pre_ddi: "55",
      pre_ddd: "11",
      pre_phone: "999999999",
      services: [
        {
          id_service: serviceRespBody1.service.id_service,
          discount: 105.15,
          price: 999.99,
          suggested_date: "2025-03-18T12:00:00.000Z",
        },
        {
          id_service: serviceRespBody1.service.id_service,
          discount: 105.15,
          price: 1000.99,
          suggested_date: "2025-03-18T12:00:00.000Z",
        },
      ],
    };

    const createOrderService = new CreateOrderService();
    await createOrderService.execute(orderData1);

    

    // Criar um novo usuário com a posição de seller
    const userResp = await fetch("http://localhost:3000/api/auth", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: "seller@teste.com",
        password: "senha123",
      }),
    });
    const userRespBody = await userResp.json();

    // Criar um novo serviço
    const servicesData = {
      description: "servico teste manager",
      type: "0",
      price: "100.25",
      observation: "obs servico teste jest, obs servico teste jest, obs servico teste jest",
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

    // Criar um novo pedido com o usuário seller
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

    const order = await createOrderService.execute(orderData);

    const listResp = await fetch(
      `http://localhost:3000/api/orders?page=1&perpage=10&search=`,
      {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${userRespBody.user.token}`,
        },
      },
    );

    expect(listResp.status).toBe(200);

    const listRespBody = await listResp.json();   
    console.log(listRespBody);

    expect(listRespBody.orders.length).toBe(1);    

    expect(listRespBody.orders[0]).toEqual({
      id_order: order?.id_order,
      user: {
        id_user: userRespBody.user.id_user,
        name: userRespBody.user.name,
      },
      status: {
        id_status_order: 1,
        description: "Aguardando envio",
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
