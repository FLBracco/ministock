import { BaseRouter } from "../shared/router/router";
import { StockMovementsController } from "./controller/stock_movements.controller";
import { StocksMovementsMiddleware } from "./middlewares/stock_movements.middleware";

export class StockMovementsRouter extends BaseRouter<StockMovementsController, StocksMovementsMiddleware>{
    constructor(){
        super(StockMovementsController, StocksMovementsMiddleware);
    }
    // Future add middlewares to only can read if you are authenticated and have role eployee or admin
    routes(): void {
        this.router.get(
            '/stock-movements', 
            (req, res)=> this.controller.getMovements(req, res)
        );
        this.router.get(
            '/stock-movements/:id', 
            (req, res)=> this.controller.getMovementByID(req, res)
        );
        this.router.post(
            '/stock-movements',
            this.middleware.passAuth("jwt"),
            (req, res, next)=> [this.middleware.checkAnyRole(req, res, next)],
            (req, res, next)=> [this.middleware.stockMovementValidator(req, res, next)],
            (req, res)=> this.controller.createMovement(req, res)
        );
    }
}