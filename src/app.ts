import "reflect-metadata";
import express from "express";
import morgan from "morgan";
import cors from 'cors';

class Server {
    public app: express.Application = express();
    private PORT: number = Number(process.env.PORT) || 3000;

    constructor(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(cors());
        this.app.use(morgan("dev"))

        this.app.get("/api/hola", (_req, res)=>{
            res.status(200).json({
                message: "Hola Mundo!"
            });
        });

        this.listen()
    }

    public listen(){
        this.app.listen(this.PORT, ()=>{
            console.log(`Server is listening on http:localhost:${this.PORT}`);
        })
    }
}

new Server();