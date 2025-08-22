import { Request, Response } from "express";
import { StockMovementService } from "../services/stock_movements.service";

export class StockMovementsController {
    
    constructor(
        private readonly stockMovementService: StockMovementService = new StockMovementService(),
    ){}

    async getMovements(_req: Request, res: Response){
        try {
            const data = await this.stockMovementService.findAllMovements();
            return res.status(200).json(data);
        }catch(e){
            console.error(e);
        }
    }

    async getMovementByID(req: Request, res: Response){
        try {
            const { id } = req.params
            const data = await this.stockMovementService.findSMByID(Number(id))
            return res.status(200).json(data);
        }catch(e){
            console.error(e);
        }
    }

    async createMovement(req: Request, res: Response){
        try {
            const data = await this.stockMovementService.createMovements(req.body);
            return res.status(201).json(data);
        }catch(e) {
            console.error(e);
        }
    }  
    
}