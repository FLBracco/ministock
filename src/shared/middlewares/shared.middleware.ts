import passport from "passport";
import { HttpResponse } from "../response/http.response";
import { NextFunction, Request, Response } from "express";
import { UserEntity } from "../../user/entities/user.entity";
import { RoleType } from "../../user/dto/user.dto";

export class SharedMiddleware {
    constructor(public httpResponse: HttpResponse = new HttpResponse()){}
    
    passAuth(type: string){
        return passport.authenticate(type, {session: false});
    }

    checkAnyRole(req: Request, res: Response, next: NextFunction){
        const user = req.user as UserEntity;
        if(user.role !== RoleType.EMPLOYED && user.role !== RoleType.ADMIN){
            return this.httpResponse.Unauthorized(res, "Access denied. Unauthorized!");
        }
        return next();
    }
    
    checkAdminRole(req: Request, res: Response, next: NextFunction){
        const user = req.user as UserEntity;
        if(user.role !== RoleType.ADMIN){
            return this.httpResponse.Unauthorized(res, "Access denied. Unauthorized!");
        };
        return next();
    }
}