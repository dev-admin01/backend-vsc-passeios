import { Router } from "express";

const router = Router();

router.get("/teste", (req, res) => {
  res.json({ message: "Alguma resposta em JSON" });
});

export { router };
