import express from "express";
import { auth } from "../middlewares/authMiddleware.js";
import problemController from "../controllers/problemController.js";

const problemRoutes = express.Router();

problemRoutes.get("/", (req, res) => problemController.getAllProblems(req, res));
problemRoutes.get("/:id", (req, res) => problemController.getProblemById(req, res));
problemRoutes.post("/", auth, (req, res) => problemController.addProblems(req, res));
problemRoutes.put("/:id", auth, (req, res) => problemController.updateProblem(req, res));
problemRoutes.delete("/:id", auth, (req, res) => problemController.deleteProblem(req, res));

export default problemRoutes;