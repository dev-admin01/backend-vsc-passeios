"use strict";

import express from "express";
import cors from "cors";
import { router } from "./routes";

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(router);

app.listen(3333, () => {
  console.log("Server is running on port 3333");
});

module.exports = app;
