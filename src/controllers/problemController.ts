import { Request, Response } from "express";
import { BaseController } from "./baseController.js";
import problemService from "../services/problemService.js";

class problemController extends BaseController {

    async addProblems(req: Request, res: Response){
        try{
            const { title, description, constraints, difficulty, examples } = req.body;
            const problem = await problemService.createProblem(title, description, constraints, difficulty, examples);
            this.success(res, "Problem created successfully", problem);
        } catch(error){
            console.log(" Add Problems Controller error ",error);
            const message = error instanceof Error ? error.message : "Problem creation failed";
            this.error(res, message);
        }
       
    }
}
export default new problemController();