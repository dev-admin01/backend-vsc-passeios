"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const create_user_controller_1 = require("./controllers/users/create_user_controller");
const teste_1 = require("./controllers/users/teste");
const router = (0, express_1.Router)();
exports.router = router;
// @ts-ignore
router.post("/user", new create_user_controller_1.CreateUserController().handle);
router.get("/teste", new teste_1.TesteController().handle);
