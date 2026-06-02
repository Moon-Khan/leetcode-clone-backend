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
    async getAllProblems(req: Request, res: Response){
        try{
            const problems = await problemService.getAllProblems();
            this.success(res, "Problems fetched successfully", problems);
        }catch(error){
            const message = error instanceof Error ? error.message : "Problem fetching failed";
            this.error(res, message);
        }
    }

    async getProblemById(req: Request, res: Response){
        try{
            const id = req.params.id as string;
            const problem = await problemService.getProblemById(id);
            this.success(res, "Problem fetched successfully", problem);
        }catch(error){
            const message = error instanceof Error ? error.message : "Problem fetching failed";
            this.error(res, message);
        }
    }

    async updateProblem(req: Request, res: Response){
        try{
            const id = req.params.id as string;
            const { title, description, constraints, difficulty, examples } = req.body;
            const problem = await problemService.updateProblem(id, { title, description, constraints, difficulty, examples });
            this.success(res, "Problem updated successfully", problem);
        }catch(error){
            const message = error instanceof Error ? error.message : "Problem update failed";
            this.error(res, message);
        }
    }

    async deleteProblem(req: Request, res: Response){
        try{
            const id = req.params.id as string;
            await problemService.deleteProblem(id);
            this.success(res, "Problem deleted successfully");
        }catch(error){
            const message = error instanceof Error ? error.message : "Problem deletion failed";
            this.error(res, message);
        }
    }
}
export default new problemController();