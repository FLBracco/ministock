import { NextFunction, Request, Response } from "express";
import { CategoryDTO } from "../dto/categories.dto";
import { validate } from "class-validator";
import { SharedMiddleware } from "../../shared/middlewares/shared.middleware";

export class CategoryMiddleware extends SharedMiddleware{
    
    constructor(){
        super();
    }
    categoryValidator(req: Request, res: Response, next: NextFunction){

        const {
            name
        } = req.body;
        const valid = new CategoryDTO();

        valid.name = name;

        validate(valid).then((err)=>{
            if(err.length > 0){
                return this.httpResponse.Error(res, err);
            }else{
                next();
            }
        })

    }

}