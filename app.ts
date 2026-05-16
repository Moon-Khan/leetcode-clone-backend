import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import initializeRoutes from "./src/routes/index.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "LeetCode Backend Running 🚀" });
});

initializeRoutes(app);

export default app;