import { Request, Response } from "express";
import { BaseController } from "./baseController.js";
import authService from "../services/authService.js";

class AuthController extends BaseController {

    getAllUsers = async (_req: Request, res: Response) => {
        const users = await authService.getAllUsers();
        this.success(res, "Users fetched successfully", users);
    };


    async userLogin(req: Request, res: Response) {
        try{
            const { email, password } = req.body;
            const user = await authService.getUser(email, password);
            this.success(res, "User logged in successfully", user);

        }catch(error){
            const message = error instanceof Error ? error.message : "Login failed";
            this.error(res, message);
        }
    }

    async userRegister(req: Request, res: Response) {

        try{
            const { username, email, password } = req.body;
            const user = await authService.createUser(username, email, password);
            this.success(res, "User registered successfully", user);

        }catch(error){
            const message = error instanceof Error ? error.message : "Registration failed";
            this.error(res, message);
        }
    }

}

export default new AuthController();
