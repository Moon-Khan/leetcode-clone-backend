import express from "express";
import authController from "../controllers/authController.js";

const router = express.Router();

router.get("/users", authController.getUsers);

export default router;
