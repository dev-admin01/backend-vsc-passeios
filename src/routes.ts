/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Router } from "express";
import { CreateUserController } from "./controllers/users/create_user_controller";
import { VerifyStatusController } from "./controllers/status/verify_status_controller";
import { VerifyMigrationsController } from "./controllers/migrations/verify_migrations_controller";
import { RunMigrationsController } from "./controllers/migrations/run_migrations_controller";
import { AuthUserController } from "./controllers/users/auth_user_controller";
import { DetailUserController } from "./controllers/users/detail_user_controller";
import { CreateServiceController } from "./controllers/service/create_service_controller";
import { ListServiceController } from "./controllers/service/list_service_controller";
import { GetServiceController } from "./controllers/service/get_service_controller";
import { UpdateServiceController } from "./controllers/service/update_service_controller";
import { DeleteServiceController } from "./controllers/service/delete_service_controller";
import { CreateCostumerController } from "./controllers/costumers/create_costumer_controller";
import { ListCostumerController } from "./controllers/costumers/list_costumer_controller";
import { GetCostumerController } from "./controllers/costumers/get_costumer_controller";
import { UpdateCostumerController } from "./controllers/costumers/update_costumer_controller";
import { DeleteCostumerController } from "./controllers/costumers/delete_costumer_controller";
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
  "/costumers",
  // @ts-ignore
  isAuthenticated,
  new CreateCostumerController().handle,
);
// @ts-ignore
router.get("/costumers", isAuthenticated, new ListCostumerController().handle);
// @ts-ignore
router.get(
  "/costumers/:id",
  // @ts-ignore
  isAuthenticated,
  new GetCostumerController().handle,
);
// @ts-ignore
router.put(
  "/costumers/:id",
  // @ts-ignore
  isAuthenticated,
  new UpdateCostumerController().handle,
);
// @ts-ignore
router.delete(
  "/costumers/:id",
  // @ts-ignore
  isAuthenticated,
  new DeleteCostumerController().handle,
);

export { router };
