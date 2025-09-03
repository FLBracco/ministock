import { NextFunction, Request, Response } from "express";
import { UserDTO } from "../dto/user.dto";
import { validate } from "class-validator";
import { SharedMiddleware } from "../../shared/middlewares/shared.middleware";

export class UserMiddleware extends SharedMiddleware{
    constructor(){
        super();
    }
    userValidator(req: Request, res: Response, next: NextFunction){

        const { 
            email,
            name,
            lastname,
            password,
            role
        } = req.body;
        const valid = new UserDTO();

        valid.email = email;
        valid.name = name;
        valid.lastname = lastname;
        valid.password = password;
        valid.role = role;

        validate(valid).then((err)=>{
            if(err.length > 0){
                return this.httpResponse.Error(res, err);
            }else{
                next();
            }
        })
    }
}