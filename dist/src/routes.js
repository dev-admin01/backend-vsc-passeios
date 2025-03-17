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
const create_service_controller_1 = require("./controllers/service/create_service_controller");
const list_service_controller_1 = require("./controllers/service/list_service_controller");
const get_service_controller_1 = require("./controllers/service/get_service_controller");
const update_service_controller_1 = require("./controllers/service/update_service_controller");
const delete_service_controller_1 = require("./controllers/service/delete_service_controller");
const create_costumer_controller_1 = require("./controllers/costumers/create_costumer_controller");
const list_costumer_controller_1 = require("./controllers/costumers/list_costumer_controller");
const get_costumer_controller_1 = require("./controllers/costumers/get_costumer_controller");
const update_costumer_controller_1 = require("./controllers/costumers/update_costumer_controller");
const delete_costumer_controller_1 = require("./controllers/costumers/delete_costumer_controller");
const isAuthenticated_1 = require("./middlewares/isAuthenticated");
const router = (0, express_1.Router)();
exports.router = router;
// Status e Migrations
// @ts-ignore
router.get("/status", new verify_status_controller_1.VerifyStatusController().handle);
// @ts-ignore
router.get("/migrations", new verify_migrations_controller_1.VerifyMigrationsController().handle);
// @ts-ignore
router.post("/migrations", new run_migrations_controller_1.RunMigrationsController().handle);
// Usuários
// @ts-ignore
router.post("/user", new create_user_controller_1.CreateUserController().handle);
// @ts-ignore
router.post("/auth", new auth_user_controller_1.AuthUserController().handle);
// @ts-ignore
router.get("/me", isAuthenticated_1.isAuthenticated, new detail_user_controller_1.DetailUserController().handle);
// Serviços
// @ts-ignore
router.post("/services", isAuthenticated_1.isAuthenticated, new create_service_controller_1.CreateServiceController().handle);
// @ts-ignore
router.get("/services", isAuthenticated_1.isAuthenticated, new list_service_controller_1.ListServiceController().handle);
// @ts-ignore
router.get("/services/:id", isAuthenticated_1.isAuthenticated, new get_service_controller_1.GetServiceController().handle);
// @ts-ignore
router.put("/services/:id", 
// @ts-ignore
isAuthenticated_1.isAuthenticated, new update_service_controller_1.UpdateServiceController().handle);
// @ts-ignore
router.delete("/services/:id", 
// @ts-ignore
isAuthenticated_1.isAuthenticated, new delete_service_controller_1.DeleteServiceController().handle);
// @ts-ignore
router.post("/costumers", 
// @ts-ignore
isAuthenticated_1.isAuthenticated, new create_costumer_controller_1.CreateCostumerController().handle);
// @ts-ignore
router.get("/costumers", isAuthenticated_1.isAuthenticated, new list_costumer_controller_1.ListCostumerController().handle);
// @ts-ignore
router.get("/costumers/:id", 
// @ts-ignore
isAuthenticated_1.isAuthenticated, new get_costumer_controller_1.GetCostumerController().handle);
// @ts-ignore
router.put("/costumers/:id", 
// @ts-ignore
isAuthenticated_1.isAuthenticated, new update_costumer_controller_1.UpdateCostumerController().handle);
// @ts-ignore
router.delete("/costumers/:id", 
// @ts-ignore
isAuthenticated_1.isAuthenticated, new delete_costumer_controller_1.DeleteCostumerController().handle);
