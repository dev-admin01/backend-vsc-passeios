import orchestrator from "../../orchestrator";
import prismaClient from "../../../src/prisma";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
}, 20000);

describe("POST /api/orders", () => {
  let createUserRespBody: any;
  let createServiceRespBody: any;

  async function authenticate(email: string, password: string) {
    const createUserResp = await fetch("http://localhost:3000/api/auth", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const createUserRespBody = await createUserResp.json();

    return createUserRespBody;
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
    const createUserRespBody = await authenticate(
      "teste@teste.com",
      "senha123",
    );

    const createServicesData = {
      id_user: createUserRespBody.user.id_user,
      description: "servico teste18",
      type: "0",
      price: "100,25",
      observation: "observacao teste texto bem grande mmesmoa e uma observacao",
      time: '["12:00","12:30","13:00","13:30","14:00"]',
    };

    const createServiceRespBody = await createValidService(
      createServicesData,
      createUserRespBody,
    );

    const lastOrder = await prismaClient.orders.findFirst({
      orderBy: { created_at: "desc" },
      select: { order_number: true },
    });

    const createCondPagData = {
      description: "condicao de pagamento teste",
      installments: "1",
      discount: "10",
    };

    const createCondPagRespBody = await createValidCondPag(
      createUserRespBody,
      createCondPagData,
    );

    const createMidiaData = {
      description: "midia teste",
    };

    const createMidiaRespBody = await createValidMidia(
      createUserRespBody,
      createMidiaData,
    );

    const createCouponData = {
      coupon: "CUPOM",
      discount: "10",
      id_midia: createMidiaRespBody.midia.id_midia,
    };

    const createCouponRespBody = await createValidCoupon(
      createUserRespBody,
      createCouponData,
    );

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
      id_user: createUserRespBody.user.id_user,
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
          discount: 0,
          price: createServiceRespBody.service.price.toString(),
          quantity: 1,
          suggested_date: "2025-03-18T12:00:00.000Z",
          time: "12:00",
        },
      ],
    };

    const orderResp = await fetch("http://localhost:3000/api/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${createUserRespBody.user.token}`,
      },
      body: JSON.stringify(orderData),
    });

    expect(orderResp.status).toBe(201);

    const orderRespBody = await orderResp.json();

    expect(orderRespBody.message).toBe(
      `Ordem ${orderNumber} criada com sucesso!`,
    );

    expect(orderRespBody.order).toEqual({
      id_order: orderRespBody.order.id_order,
      id_user: createUserRespBody.user.id_user,
      id_status_order: 1,
      order_number: orderNumber,
      price: "1500,91",
      pre_name: "cliente teste jest",
      pre_email: "jest@teste.com",
      pre_ddi: "55",
      pre_ddd: "11",
      pre_phone: "999999999",
      created_at: orderRespBody.order.created_at,
      id_cond_pag: createCondPagRespBody.condicaoPagamento.id_cond_pag,
      id_coupons: createCouponRespBody.coupons.id_coupons,
      orders_service: [
        {
          id_order_service:
            orderRespBody.order.orders_service[0].id_order_service,
          id_order: orderRespBody.order.id_order,
          id_service: createServiceRespBody.service.id_service,
          quantity: 1,
          discount: "0",
          price: createServiceRespBody.service.price.toString(),
          time: "12:00",
          suggested_date: "2025-03-18T12:00:00.000Z",
        },
      ],
    });
  }, 20000);
});
