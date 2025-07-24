import "reflect-metadata";
import express from "express";
import morgan from "morgan";
import cors from 'cors';
import { UserRouter } from "./router/user.router";

class ServerBootstrap {
    public app: express.Application = express();
    private PORT: number = Number(process.env.PORT) || 3000;

    constructor(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(cors());
        this.app.use(morgan("dev"))

        this.app.use('/api', this.routers())
        this.listen()
    }

    routers(): Array<express.Router>{
        return [new UserRouter().router];
    }

    public listen(){
        this.app.listen(this.PORT, ()=>{
            console.log(`Server is listening on http:localhost:${this.PORT}`);
        })
    }
}

new ServerBootstrap();