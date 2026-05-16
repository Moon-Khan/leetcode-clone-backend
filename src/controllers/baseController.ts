import { Request, Response } from "express";    

interface ApiResponse<T> {
    status : string,
    message : string,
    data? : T,
    meta? : {
        total : number,
        page : number,
        limit : number,
        totalPages : number
    }
}

export class BaseController {

    protected success<T>(
        res : Response,
        message : string,
        data? : T,
        meta? : {
            total : number,
            page : number,
            limit : number,
            totalPages : number 
        }
    ): void {
        const response : ApiResponse<T> = {
            status : "success",
            message,
            data,
            meta
        }
        res.status(200).json(response);
    }

    protected error<T>(
        res : Response,
        message : string,
        data? : T,
        meta? : {
            total : number,
            page : number,
            limit : number,
            totalPages : number 
        }): void  {
            const response : ApiResponse<T> = {
                status : "error",
                message,
                data,
                meta
            }
            res.status(400).json(response);
    }
    
}
