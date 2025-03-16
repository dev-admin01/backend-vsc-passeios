"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
/* eslint-disable @typescript-eslint/ban-ts-comment */
const express_1 = require("express");
const create_user_controller_1 = require("./controllers/users/create_user_controller");
const verify_status_controller_1 = require("./controllers/status/verify_status_controller");
const verify_migrations_controller_1 = require("./controllers/migrations/verify_migrations_controller");
const run_migrations_controller_1 = require("./controllers/migrations/run_migrations_controller");
const auth_user_controller_1 = require("./controllers/users/auth_user_controller");
const detail_user_controller_1 = require("./controllers/users/detail_user_controller");
const create_service_cotnroller_1 = require("./controllers/service/create_service_cotnroller");
const isAuthenticated_1 = require("./middlewares/isAuthenticated");
const router = (0, express_1.Router)();
exports.router = router;
// @ts-ignore
router.get("/status", new verify_status_controller_1.VerifyStatusController().handle);
// @ts-ignore
router.get("/migrations", new verify_migrations_controller_1.VerifyMigrationsController().handle);
// @ts-ignore
router.post("/migrations", new run_migrations_controller_1.RunMigrationsController().handle);
// @ts-ignore
router.post("/user", new create_user_controller_1.CreateUserController().handle);
// @ts-ignore
router.post("/auth", new auth_user_controller_1.AuthUserController().handle);
// @ts-ignore
router.get("/me", isAuthenticated_1.isAuthenticated, new detail_user_controller_1.DetailUserController().handle);
// @ts-ignore
router.post("/services", isAuthenticated_1.isAuthenticated, new create_service_cotnroller_1.CreateServiceController().handle);
