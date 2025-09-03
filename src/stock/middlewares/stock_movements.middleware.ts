import { NextFunction, Request, Response } from "express";
import { StockMovementDTO } from "../dto/stock_movements.dto";
import { validate } from "class-validator";
import { SharedMiddleware } from "../../shared/middlewares/shared.middleware";

export class StocksMovementsMiddleware extends SharedMiddleware{
    
    constructor(){
        super();
    }
    stockMovementValidator(req: Request, res: Response, next: NextFunction){
        
        const {
            product,
            user,
            type,
            quantity,
        } = req.body;
        const valid = new StockMovementDTO();

        valid.product = product;
        valid.user = user;
        valid.type = type;
        valid.quantity = quantity;

        validate(valid).then((err) => {
            if(err.length > 0){
                return this.httpResponse.Error(res, err);
            }else{
                next();
            }
        })

    }

}