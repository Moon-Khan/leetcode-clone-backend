import express from "express";
import authController from "../controllers/authController.js";
import { auth } from "../middlewares/authMiddleware.js";

const authRoutes = express.Router();

authRoutes.get("/users", auth, (req, res) => authController.getAllUsers(req, res));
authRoutes.post("/register", (req, res) => authController.userRegister(req, res));
authRoutes.post("/login", (req, res) => authController.userLogin(req, res));

export default authRoutes;
