import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { HttpResponse } from "../../shared/response/http.response";

export class UserController {
    constructor(
        private readonly userService: UserService = new UserService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ){}
    
    async getUsers(_req: Request, res: Response){
        try {
            const data = await this.userService.findAllUsers();
            return this.httpResponse.Ok(res, data);
        }catch(e) {
            console.error(e);
            return this.httpResponse.Error(res, e);
        }
    }
    async getUserByID(req: Request, res: Response){
        try {
            const { id } = req.params
            const data = await this.userService.findUserByID(Number(id));
            return this.httpResponse.Ok(res, data);
        }catch(e) {
            console.error(e);
            return this.httpResponse.Error(res, e);
        }
    }
    async createUser(req: Request, res: Response){
        try {
            const data = await this.userService.createUser(req.body);
            return this.httpResponse.Created(res, data);
        }catch(e) {
            console.error(e);
            return this.httpResponse.Error(res, e);
        }
    }
    async updateUser(req: Request, res: Response){
        try {
            const { id } = req.params
            const data = await this.userService.updateUser(Number(id), req.body);
            return this.httpResponse.Ok(res, data);
        }catch(e) {
            console.error(e);
            return this.httpResponse.Error(res, e);
        }
    }
    async deleteUser(req: Request, res: Response){
        try {
            const { id } = req.params
            const data = await this.userService.deleteUser(Number(id));
            return this.httpResponse.Ok(res, data);
        }catch(e) {
            console.error(e);
            return this.httpResponse.Error(res, e);
        }
    }
}