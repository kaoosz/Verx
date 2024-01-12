import { Request,Response,NextFunction } from "express";
import { farmSchema } from "../validation/farmValidation"

export function validateFarm(req: Request,res: Response, next: NextFunction){
    try {
        const result = farmSchema.safeParse(req.body);
        if(!result.success){
            return res.status(400).send({error: result.error.issues.map(item => item.message)});
        }
        req.body = result.data;
        next();
        
    } catch (error:any) {
        return res.status(400).json({error: error.errors})
    }
}