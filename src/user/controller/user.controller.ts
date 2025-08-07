import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { HttpResponse } from "../../shared/response/http.response";
import { UpdateResult } from "typeorm";
import { DeleteResult } from "typeorm/browser";

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
            const data: UpdateResult = await this.userService.updateUser(Number(id), req.body);
            if (data.affected === 0){
                return this.httpResponse.NotFound(res, "User not found");
            }
            return this.httpResponse.Ok(res, data);
        }catch(e) {
            console.error(e);
            return this.httpResponse.Error(res, e);
        }
    }
    async deleteUser(req: Request, res: Response){
        try {
            const { id } = req.params
            const data: DeleteResult = await this.userService.deleteUser(Number(id));
            if (data.affected === 0){
                return this.httpResponse.NotFound(res, "User not found");
            }
            return this.httpResponse.Ok(res, data);
        }catch(e) {
            console.error(e);
            return this.httpResponse.Error(res, e);
        }
    }
}