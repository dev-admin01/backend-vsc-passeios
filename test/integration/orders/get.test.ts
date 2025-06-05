import orchestrator from "../../orchestrator";
import { CreateOrderService } from "../../../src/services/orders/create_orders_service";

import { ICreateOrderService } from "../../../src/types/order.type";
import prismaClient from "../../../src/prisma";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
}, 20000);

describe("POST /api/orders", () => {
  async function authenticate(email: string, password: string) {
    const response = await fetch("http://localhost:3000/api/auth", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const userRespBody = await response.json();
    return userRespBody;
  }
  async function createValidService(
    createServicesData: any,
    createUserRespBody: any,
  ) {
    const createServiceResp = await fetch(
      "http://localhost:3000/api/services",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${createUserRespBody.user.token}`,
        },
        body: JSON.stringify(createServicesData),
      },
    );

    const createServiceRespBody = await createServiceResp.json();

    return createServiceRespBody;
  }

  async function createValidMidia(
    createUserRespBody: any,
    createMidiaData: any,
  ) {
    const createMidiaResp = await fetch("http://localhost:3000/api/midia", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${createUserRespBody.user.token}`,
      },
      body: JSON.stringify(createMidiaData),
    });

    const createMidiaRespBody = await createMidiaResp.json();

    return createMidiaRespBody;
  }

  async function createValidCondPag(
    createUserRespBody: any,
    createCondPagData: any,
  ) {
    const createCondPagResp = await fetch(
      "http://localhost:3000/api/condicao-pagamento",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${createUserRespBody.user.token}`,
        },
        body: JSON.stringify(createCondPagData),
      },
    );

    const createCondPagRespBody = await createCondPagResp.json();

    return createCondPagRespBody;
  }

  async function createValidCoupon(
    createUserRespBody: any,
    createCouponData: any,
  ) {
    const createCouponResp = await fetch("http://localhost:3000/api/coupons", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${createUserRespBody.user.token}`,
      },
      body: JSON.stringify(createCouponData),
    });

    const createCouponRespBody = await createCouponResp.json();

    return createCouponRespBody;
  }

  test("with valid inputs", async () => {
    const userRespBody = await authenticate("teste@teste.com", "senha123");

    const servicesData = {
      id_user: userRespBody.user.id_user,
      description: "servico teste18",
      type: "0",
      price: "100,25",
      observation:
        "obs servico teste jest, obs servico teste jest, obs servico teste jest",
      time: '["12:00","12:30","13:00","13:30","14:00"]',
    };

    const createServiceRespBody = await createValidService(
      servicesData,
      userRespBody,
    );

    const createCondPagData = {
      description: "condicao de pagamento teste",
      installments: "1",
      discount: "10",
    };

    const createCondPagRespBody = await createValidCondPag(
      userRespBody,
      createCondPagData,
    );

    const createMidiaData = {
      description: "midia teste",
    };

    const createMidiaRespBody = await createValidMidia(
      userRespBody,
      createMidiaData,
    );

    const createCouponData = {
      coupon: "CUPOM",
      discount: "10",
      id_midia: createMidiaRespBody.midia.id_midia,
    };

    const createCouponRespBody = await createValidCoupon(
      userRespBody,
      createCouponData,
    );

    const lastOrder = await prismaClient.orders.findFirst({
      orderBy: { order_number: "desc" },
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

    const orderData: ICreateOrderService = {
      id_user: userRespBody.user.id_user,
      order_number: orderNumber,
      price: "1.500,91",
      pre_name: "cliente teste jest",
      pre_email: "jest@teste.com",
      pre_ddi: "55",
      pre_ddd: "11",
      pre_phone: "999999999",
      id_cond_pag: createCondPagRespBody.condicaoPagamento.id_cond_pag,
      id_coupons: createCouponRespBody.coupons.id_coupons,
      services: [
        {
          id_service: createServiceRespBody.service.id_service,
          discount: "0",
          price: "100,25",
          suggested_date: "2025-03-18T12:00:00.000Z",
          quantity: 1,
          time: "12:00",
        },
        {
          id_service: createServiceRespBody.service.id_service,
          discount: "0",
          price: "100,25",
          suggested_date: "2025-03-18T12:00:00.000Z",
          quantity: 1,
          time: "14:00",
        },
      ],
    };

    const createService = new CreateOrderService();
    const order = await createService.execute(orderData);

    const orderBody = await fetch(
      `http://localhost:3000/api/orders/${order?.id_order}`,
      {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${userRespBody.user.token}`,
        },
      },
    );

    expect(orderBody.status).toBe(200);

    const orderBodyResp = await orderBody.json();

    expect(orderBodyResp).toEqual({
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
      price: "1500,91",
      pre_name: "cliente teste jest",
      pre_email: "jest@teste.com",
      pre_ddi: "55",
      pre_ddd: "11",
      pre_phone: "999999999",
      created_at: order?.created_at.toISOString(),
      orders_service: [
        {
          id_order_service: orderBodyResp.orders_service[0].id_order_service,
          id_service: createServiceRespBody.service.id_service,
          discount: "0",
          price: orderBodyResp.orders_service[0].price,
          suggested_date: "2025-03-18T12:00:00.000Z",
          service: {
            description: createServiceRespBody.service.description,
          },
        },
        {
          id_order_service: orderBodyResp.orders_service[1].id_order_service,
          id_service: createServiceRespBody.service.id_service,
          discount: "0",
          price: orderBodyResp.orders_service[1].price,
          suggested_date: "2025-03-18T12:00:00.000Z",
          service: {
            description: createServiceRespBody.service.description,
          },
        },
      ],
    });
  }, 20000);
});
