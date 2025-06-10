/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Router } from "express";
// USER - AUTH
import { CreateUserController } from "./controllers/users/create_user_controller";
import { VerifyStatusController } from "./controllers/status/verify_status_controller";
import { VerifyMigrationsController } from "./controllers/migrations/verify_migrations_controller";
import { RunMigrationsController } from "./controllers/migrations/run_migrations_controller";
import { AuthUserController } from "./controllers/users/auth_user_controller";
import { DetailUserController } from "./controllers/users/detail_user_controller";
// COSTUMER
import { CreateServiceController } from "./controllers/service/create_service_controller";
import { ListServiceController } from "./controllers/service/list_service_controller";
import { GetServiceController } from "./controllers/service/get_service_controller";
import { UpdateServiceController } from "./controllers/service/update_service_controller";
import { DeleteServiceController } from "./controllers/service/delete_service_controller";
// COSTUMER
import { CreateCostumerController } from "./controllers/costumers/create_costumer_controller";
import { ListCostumerController } from "./controllers/costumers/list_costumer_controller";
import { GetCostumerController } from "./controllers/costumers/get_costumer_controller";
import { UpdateCostumerController } from "./controllers/costumers/update_costumer_controller";
import { DeleteCostumerController } from "./controllers/costumers/delete_costumer_controller";
//  STATUS ORDERS
import { CreateOrderStatusController } from "./controllers/order_status/create_order_status_controller";
import { ListOrderStatusController } from "./controllers/order_status/list_order_status_controller";
import { GetOrderStatusController } from "./controllers/order_status/get_orders_status_controller";
import { UpdateOrderStatusController } from "./controllers/order_status/update_order_status_controller";
import { DeleteOrderStatusController } from "./controllers/order_status/delete_order_status_controller";
// ORDERS
import { CreateOrderController } from "./controllers/orders/create_orders_controllers";
import { ListOrderController } from "./controllers/orders/list_order_controller";
import { GetOrderController } from "./controllers/orders/get_order_controller";
import { UpdateOrderController } from "./controllers/orders/update_order_controller";
import { DeleteOrderController } from "./controllers/orders/delete_order_services";

import { UpdateOrderDocs } from "./controllers/costumers/custumer_docs_controller";
import { SendStatusOrderController } from "./controllers/orders/send_status_controller";

// Novos controllers
import { CreateMidiaController } from "./controllers/midia/create_midia_controller";
import { ListMidiaController } from "./controllers/midia/list_midia_controller";
import { GetMidiaController } from "./controllers/midia/get_midia_controller";
import { UpdateMidiaController } from "./controllers/midia/update_midia_controller";
import { DeleteMidiaController } from "./controllers/midia/delete_midia_controller";

import { CreateCouponsController } from "./controllers/coupons/create_coupons_controller";
import { ListCouponsController } from "./controllers/coupons/list_coupons_controller";
import { GetCouponsController } from "./controllers/coupons/get_coupons_controller";
import { UpdateCouponsController } from "./controllers/coupons/update_coupons_controller";
import { DeleteCouponsController } from "./controllers/coupons/delete_coupons_controller";

import { CreateCondicaoPagamentoController } from "./controllers/condicao_pagamento/create_condicao_pagamento_controller";
import { ListCondicaoPagamentoController } from "./controllers/condicao_pagamento/list_condicao_pagamento_controller";
import { GetCondicaoPagamentoController } from "./controllers/condicao_pagamento/get_condicao_pagamento_controller";
import { UpdateCondicaoPagamentoController } from "./controllers/condicao_pagamento/update_condicao_pagamento_controller";
import { DeleteCondicaoPagamentoController } from "./controllers/condicao_pagamento/delete_condicao_pagamento_controller";

import { GetOrderPDFDataController } from "./controllers/pdf/get_order_pdf_data_controller";

import { GetOrderRegisterLinkController } from "./controllers/register_link/get_orde_register_controller";
import { GetDocsValidationController } from "./controllers/order_documentation/get_docs_validation_controller";

import { isAuthenticated } from "./middlewares/isAuthenticated";

const router = Router();

// Status e Migrations
// @ts-ignore
router.get("/status", new VerifyStatusController().handle);
// @ts-ignore
router.get("/migrations", new VerifyMigrationsController().handle);
// @ts-ignore
router.post("/migrations", new RunMigrationsController().handle);

// Usuários
// @ts-ignore
router.post("/user", new CreateUserController().handle);
// @ts-ignore
router.post("/auth", new AuthUserController().handle);
// @ts-ignore
router.get("/me", isAuthenticated, new DetailUserController().handle);

// Serviços
// @ts-ignore
router.post("/services", isAuthenticated, new CreateServiceController().handle);
// @ts-ignore
router.get("/services", isAuthenticated, new ListServiceController().handle);
// @ts-ignore
router.get("/services/:id", isAuthenticated, new GetServiceController().handle);
// @ts-ignore
router.put(
  "/services/:id",
  // @ts-ignore
  isAuthenticated,
  new UpdateServiceController().handle,
);
// @ts-ignore
router.delete(
  "/services/:id",
  // @ts-ignore
  isAuthenticated,
  new DeleteServiceController().handle,
);
// @ts-ignore
router.post(
  "/customers",
  // @ts-ignore
  isAuthenticated,
  new CreateCostumerController().handle,
);
// @ts-ignore
router.get("/customers", isAuthenticated, new ListCostumerController().handle);
// @ts-ignore
router.get(
  "/customers/:id",
  // @ts-ignore
  isAuthenticated,
  new GetCostumerController().handle,
);
// @ts-ignore
router.put(
  "/customers/:id",
  // @ts-ignore
  isAuthenticated,
  new UpdateCostumerController().handle,
);
// @ts-ignore
router.delete(
  "/customers/:id",
  // @ts-ignore
  isAuthenticated,
  new DeleteCostumerController().handle,
);
// @ts-ignore
router.post(
  "/order-status",
  // @ts-ignore
  isAuthenticated,
  new CreateOrderStatusController().handle,
);
// @ts-ignore
router.get(
  "/order-status",
  // @ts-ignore
  isAuthenticated,
  new ListOrderStatusController().handle,
);
// @ts-ignore
router.get(
  "/order-status/:id",
  // @ts-ignore
  isAuthenticated,
  new GetOrderStatusController().handle,
);
// @ts-ignore
router.put(
  "/order-status/:id",
  // @ts-ignore
  isAuthenticated,
  new UpdateOrderStatusController().handle,
);
// @ts-ignore
router.delete(
  "/order-status/:id",
  // @ts-ignore
  isAuthenticated,
  new DeleteOrderStatusController().handle,
);

// @ts-ignore
router.post(
  "/orders",
  // @ts-ignore
  isAuthenticated,
  new CreateOrderController().handle,
);
// @ts-ignore
router.get(
  "/orders",
  // @ts-ignore
  isAuthenticated,
  new ListOrderController().handle,
);
// @ts-ignore
router.get(
  "/orders/:id",
  // @ts-ignore
  new GetOrderController().handle,
);
// @ts-ignore
router.put(
  "/orders/:id",
  // @ts-ignore
  isAuthenticated,
  new UpdateOrderController().handle,
);
// @ts-ignore
router.delete(
  "/orders/:id",
  // @ts-ignore
  isAuthenticated,
  new DeleteOrderController().handle,
);
// @ts-ignore
router.put("/orderdocs", new UpdateOrderDocs().handle);

// @ts-ignore
router.put(
  "/statusupdate",
  // @ts-ignore
  isAuthenticated,
  new SendStatusOrderController().handle,
);

// Rotas para Midia
// @ts-ignore
router.post("/midia", isAuthenticated, new CreateMidiaController().handle);
// @ts-ignore
router.get("/midia", isAuthenticated, new ListMidiaController().handle);
// @ts-ignore
router.get("/midia/:id", isAuthenticated, new GetMidiaController().handle);
// @ts-ignore
router.put("/midia/:id", isAuthenticated, new UpdateMidiaController().handle);
// @ts-ignore
router.delete(
  "/midia/:id",
  // @ts-ignore
  isAuthenticated,
  new DeleteMidiaController().handle,
);

// Rotas para Coupons
// @ts-ignore
router.post("/coupons", isAuthenticated, new CreateCouponsController().handle);
// @ts-ignore
router.get("/coupons", isAuthenticated, new ListCouponsController().handle);
// @ts-ignore
router.get("/coupons/:id", isAuthenticated, new GetCouponsController().handle);
// @ts-ignore
router.put(
  "/coupons/:id",
  // @ts-ignore
  isAuthenticated,
  new UpdateCouponsController().handle,
);
// @ts-ignore
router.delete(
  "/coupons/:id",
  // @ts-ignore
  isAuthenticated,
  new DeleteCouponsController().handle,
);

// Rotas para Condicao_Pagamento
// @ts-ignore
router.post(
  "/condicao-pagamento",
  // @ts-ignore
  isAuthenticated,
  new CreateCondicaoPagamentoController().handle,
);
// @ts-ignore
router.get(
  "/condicao-pagamento",
  // @ts-ignore
  isAuthenticated,
  new ListCondicaoPagamentoController().handle,
);
// @ts-ignore
router.get(
  "/condicao-pagamento/:id",
  // @ts-ignore
  isAuthenticated,
  new GetCondicaoPagamentoController().handle,
);
// @ts-ignore
router.put(
  "/condicao-pagamento/:id",
  // @ts-ignore
  isAuthenticated,
  new UpdateCondicaoPagamentoController().handle,
);
// @ts-ignore
router.delete(
  "/condicao-pagamento/:id",
  // @ts-ignore
  isAuthenticated,
  new DeleteCondicaoPagamentoController().handle,
);

// Rotas para PDF
// @ts-ignore
router.get("/pdf/order/:id", new GetOrderPDFDataController().handle);

// @ts-ignore
router.get("/register/order/:id", new GetOrderRegisterLinkController().handle);

// @ts-ignore
router.get("/orderdocs/:id", new GetDocsValidationController().handle);

export { router };
