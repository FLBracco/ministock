import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
    constructor(private readonly userService: UserService = new UserService()){}
    async getUsers(_req: Request, res: Response){
        try {
            const data = await this.userService.findAllUsers();
            res.status(200).json(data);
        }catch(e) {
            console.error(e);
        }
    }
    async getUserByID(req: Request, res: Response){
        try {
            const { id } = req.params
            const data = await this.userService.findUserByID(Number(id));
            res.status(200).json(data);
        }catch(e) {
            console.error(e);
        }
    }
    async createUser(req: Request, res: Response){
        try {
            const data = await this.userService.createUser(req.body);
            res.status(200).json(data);
        }catch(e) {
            console.error(e);
        }
    }
    async updateUser(req: Request, res: Response){
        try {
            const { id } = req.params
            const data = await this.userService.updateUser(Number(id), req.body);
            res.status(200).json(data);
        }catch(e) {
            console.error(e);
        }
    }
    async deleteUser(req: Request, res: Response){
        try {
            const { id } = req.params
            const data = await this.userService.deleteUser(Number(id));
            res.status(200).json(data);
        }catch(e) {
            console.error(e);
        }
    }
}