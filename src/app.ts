import "reflect-metadata";
import express from "express";
import morgan from "morgan";
import cors from 'cors';
import { UserRouter } from "./user/user.router";
import { ConfigServer } from "./config/config";
import { ProductRouter } from "./products/products.router";
import { CategoryRouter } from "./categories/categories.router";
import { DataSource } from "typeorm";
import { StockMovementsRouter } from "./stock/stock_movements.router";
import { ProductsCategoriesRouter } from "./products/products_categories.router";
import { LoginStrategy } from "./auth/strategies/login.strategy";
import { JwtStrategy } from "./auth/strategies/jwt.strategy";

class ServerBootstrap extends ConfigServer{
    public app: express.Application = express();
    private port: number = this.getNumberEnv("PORT");

    constructor(){
        super();
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.passportUse();
        this.dbConnect();
        
        this.app.use(cors());
        this.app.use(morgan("dev"))

        this.app.use('/api', this.routers())
        this.listen()
    }

    routers(): Array<express.Router>{
        return [
            new UserRouter().router,
            new ProductRouter().router,
            new CategoryRouter().router,
            new StockMovementsRouter().router,
            new ProductsCategoriesRouter().router,
        ];
    }

    passportUse(){
        return [new LoginStrategy().use, new JwtStrategy().use];
    }

    async dbConnect(): Promise<DataSource | void>{
        return this.initConnect.then(()=>{
            console.log("Database connected successfully");
        }).catch((e)=>{
            console.error(e);
        })
    }
    
    public listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Server is listening on http:localhost:${this.port}`);
        })
    }
}

new ServerBootstrap();