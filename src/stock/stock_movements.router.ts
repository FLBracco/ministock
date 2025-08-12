import { BaseRouter } from "../shared/router/router";
import { StockMovementsController } from "./controller/stock_movements.controller";

export class StockMovementsRouter extends BaseRouter<StockMovementsController>{
    constructor(){
        super(StockMovementsController);
    }

    routes(): void {
        this.router.get('/stock-movements', (req, res)=> this.controller.getMovements(req, res));
        // this.router.get('/stock-movements/:id', (req, res)=> this.controller.getMovementByID(req, res));
        this.router.post('/stock-movements', (req, res)=> this.controller.createMovement(req, res));
        this.router.put('/stock-movements/:id', (req, res)=> this.controller.updateMovement(req, res));
        this.router.delete('/stock-movements/:id', (req, res)=> this.controller.deleteMovement(req, res));
    }
}