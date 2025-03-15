"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const create_user_controller_1 = require("./controllers/users/create_user_controller");
const verify_status_controller_1 = require("./controllers/status/verify_status_controller");
const verify_migrations_controller_1 = require("./controllers/migrations/verify_migrations_controller");
const run_migrations_controller_1 = require("./controllers/migrations/run_migrations_controller");
const auth_user_controller_1 = require("./controllers/users/auth_user_controller");
const isAuthenticated_1 = require("./middlewares/isAuthenticated");
const teste_controlloer_1 = require("./controllers/teste/teste_controlloer");
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
router.get("/testemiddleware", 
// @ts-ignore
isAuthenticated_1.isAuthenticated, new teste_controlloer_1.TestController().handle);
