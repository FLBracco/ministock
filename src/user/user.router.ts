import { UserController } from "./controller/user.controller";
import { BaseRouter } from "../shared/router/router";

export class UserRouter extends BaseRouter<UserController>{
    constructor(){
        super(UserController);
    }

    routes(): void {
        this.router.get('/user', (req, res)=> this.controller.getUsers(req, res));
        this.router.get('/user/:id', (req, res)=> this.controller.getUserByID(req, res));
        this.router.post('/user', (req, res)=> this.controller.createUser(req, res));
        this.router.put('/user/:id', (req, res)=> this.controller.updateUser(req, res));
        this.router.delete('/user/:id', (req, res)=> this.controller.deleteUser(req, res));
    }
}