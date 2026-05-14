import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import initializeRoutes from "./src/routes/index.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

initializeRoutes(app);

export default app;
