import { Request, Response } from "express";
import { BaseController } from "./baseController.js";
import { getAllUsers } from "../services/authService.js";

class AuthController extends BaseController {

    getUsers = async (_req: Request, res: Response) => {
        const users = await getAllUsers();
        this.success(res, "Users fetched successfully", users);
    };

}

export default new AuthController();
