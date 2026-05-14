import type { Application } from "express";
import authRoutes from "./authRoutes.js";

const initializeRoutes = (app: Application) => {
    app.use("/v1/auth", authRoutes);
};

export default initializeRoutes;
