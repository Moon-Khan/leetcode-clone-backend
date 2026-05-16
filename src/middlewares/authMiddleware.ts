import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";


export interface AuthUser {
  id: string;
  email: string;
}

declare global {
    namespace Express {
        interface Request {
        user?: AuthUser;
        }
    }
} 

export function auth(req: Request, res: Response, next: NextFunction) {
    
    const headers = req.headers.authorization;
    if (!headers) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = headers.slice(7);
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try{
        const secret = process.env.JWT_SECRET as string;
        const payload = jwt.verify(token, secret) as AuthUser;
        if (!payload) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = payload;
        next();
    }catch(error){
        console.log("JWT verification error:", error);
        return res.status(401).json({ message: "Unauthorized" });
    }


}