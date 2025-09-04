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
            if(!data){
                return this.httpResponse.NotFound(res, 'Stock Movement not found!');
            }
            return this.httpResponse.Ok(res, data);
        }catch(e){
            console.error(e);
            return this.httpResponse.Error(res, e);
        }
    }
    
    async createMovement(req: Request, res: Response){
        try {
            const user = req.user as { sub: string, role: string};
            const newSM = {...req.body, user: Number(user.sub)};
            const data = await this.stockMovementService.createMovements(newSM);
            return this.httpResponse.Created(res, data);
        }catch(e: any){
            console.error(e);
            if(e.message === "Product not found"){
                return this.httpResponse.NotFound(res, e.message);
            }
            if(e.message === "Insufficient stock for this operation"){
                return this.httpResponse.BadRequest(res, e.message);
            }
            return this.httpResponse.Error(res, e.message);
        }
    }  
    
}