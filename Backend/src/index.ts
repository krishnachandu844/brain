import express from "express";
import user from "./routes/user.js";
import content from "./routes/content.js";
import cors from "cors";

import dotenv from "dotenv";
import { dbConnection } from "./database/db.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1", user);
app.use("/api/v1", content);

app.listen(3002, () => {
  dbConnection();
  console.log("Server Started");
});
