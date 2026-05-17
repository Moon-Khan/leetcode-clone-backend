import express from "express";
import { auth } from "../middlewares/authMiddleware.js";
import problemController from "../controllers/problemController.js";

const problemRoutes = express.Router();

// problemRoutes.get("/", problemController.getAllProblems);
// problemRoutes.get("/:id", problemController.getProblemById);
problemRoutes.post("/", auth, (req, res) => problemController.addProblems(req, res));
// problemRoutes.put("/:id", problemController.updateProblem);
// problemRoutes.delete("/:id", problemController.deleteProblem);

export default problemRoutes;