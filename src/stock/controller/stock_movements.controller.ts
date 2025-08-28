import { Request, Response } from "express";
import { StockMovementService } from "../services/stock_movements.service";
import { HttpResponse } from "../../shared/response/http.response";

export class StockMovementsController {
    
    constructor(
        private readonly stockMovementService: StockMovementService = new StockMovementService(),
        private readonly httpResponse: HttpResponse = new HttpResponse(),
        
    ){}

    async getMovements(_req: Request, res: Response){
        try {
            const data = await this.stockMovementService.findAllMovements();
            return this.httpResponse.Ok(res, data);
        }catch(e){
            console.error(e);
            return this.httpResponse.Error(res, e);
        }
    }
    
    async getMovementByID(req: Request, res: Response){
        try {
            const { id } = req.params
            const data = await this.stockMovementService.findSMByID(Number(id))
            return this.httpResponse.Ok(res, data);
        }catch(e){
            console.error(e);
            return this.httpResponse.Error(res, e);
        }
    }
    
    async createMovement(req: Request, res: Response){
        try {
            const data = await this.stockMovementService.createMovements(req.body);
            return this.httpResponse.Created(res, data);
        }catch(e) {
            console.error(e);
            return this.httpResponse.Error(res, e);
        }
    }  
    
}