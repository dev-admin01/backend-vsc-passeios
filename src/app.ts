import express from "express";
// import cors from "cors";
import { router } from "./routes";
// import { setupSwagger } from "./swagger";

const app = express();

// app.use(cors());
app.use(express.json());
app.use("/api", router);

// setupSwagger(app);

export default app;
