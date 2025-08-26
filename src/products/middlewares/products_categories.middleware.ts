import { NextFunction, Request, Response } from "express";
import { ProductsCategoriesDTO } from "../dto/products_categories.dto";
import { validate } from "class-validator";
import { HttpResponse } from "../../shared/response/http.response";

export class ProductsCategoriesMiddleware {
    constructor(private readonly httpResponse: HttpResponse = new HttpResponse()){}
    prodCategoriesValidator(req: Request, res: Response, next: NextFunction){

        const {
            product,
            category
        } = req.body;
        const valid = new ProductsCategoriesDTO();

        valid.product = product;
        valid.category = category;

        validate(valid).then((err)=>{
            if(err.length > 0){
                return this.httpResponse.Error(res, err);
            }else{
                next();
            }
        })

    }
}