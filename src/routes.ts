import { Router } from "express";
import { CreateUserController } from "./controllers/users/create_user_controller";

const router = Router();

// @ts-ignore
router.post("/user", new CreateUserController().handle);

export { router };
