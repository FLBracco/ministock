import { BaseRouter } from "../shared/router/router";

export class StockMovementsRouter extends BaseRouter{
    constructor(){
        super(StockMovementsController);
    }

    routes(): void {
        this.router.get('/stock-movements', (req, res)=> this.controller.getStockMovements(req, res));
        this.router.get('/stock-movements/:id', (req, res)=> this.controller.getStockMovementByID(req, res));
        this.router.post('/stock-movements', (req, res)=> this.controller.createStockMovement(req, res));
        this.router.put('/stock-movements/:id', (req, res)=> this.controller.updateStockMovement(req, res));
        this.router.delete('/stock-movements/:id', (req, res)=> this.controller.deleteStockMovement(req, res));
    }
}