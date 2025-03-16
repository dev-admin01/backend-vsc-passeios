/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Router } from "express";
import { CreateUserController } from "./controllers/users/create_user_controller";
import { VerifyStatusController } from "./controllers/status/verify_status_controller";
import { VerifyMigrationsController } from "./controllers/migrations/verify_migrations_controller";
import { RunMigrationsController } from "./controllers/migrations/run_migrations_controller";
import { AuthUserController } from "./controllers/users/auth_user_controller";
import { DetailUserController } from "./controllers/users/detail_user_controller";
import { CreateServiceController } from "./controllers/service/create_service_cotnroller";
import { isAuthenticated } from "./middlewares/isAuthenticated";

const router = Router();

// @ts-ignore
router.get("/status", new VerifyStatusController().handle);

// @ts-ignore
router.get("/migrations", new VerifyMigrationsController().handle);
// @ts-ignore
router.post("/migrations", new RunMigrationsController().handle);

// @ts-ignore
router.post("/user", new CreateUserController().handle);

// @ts-ignore
router.post("/auth", new AuthUserController().handle);
// @ts-ignore
router.get("/me", isAuthenticated, new DetailUserController().handle);
// @ts-ignore
router.post("/services", isAuthenticated, new CreateServiceController().handle);

export { router };
