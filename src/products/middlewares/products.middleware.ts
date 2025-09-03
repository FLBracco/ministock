import { NextFunction, Request, Response } from "express";
import { ProductsDTO } from "../dto/products.dto";
import { validate } from "class-validator";
import { SharedMiddleware } from "../../shared/middlewares/shared.middleware";

export class ProductsMiddleware extends SharedMiddleware{
    constructor(){
        super();
    }
    productValidator(req: Request, res: Response, next: NextFunction){
        
        const {
            productName,
            description,
            price,
            stockQuantity,
        } = req.body
        const valid = new ProductsDTO();

        valid.productName = productName;
        valid.description = description;
        valid.price = price;
        valid.stockQuantity = stockQuantity;

        validate(valid).then((err)=>{
            if(err.length > 0){
                return this.httpResponse.Error(res, err);
            }else{
                next();
            }
        })

    }
}