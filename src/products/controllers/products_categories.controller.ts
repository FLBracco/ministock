import { Request, Response } from "express";
import { ProductsCategoriesService } from "../services/products_categories.service";

export class ProductsCategoriesController {
    constructor(
        private readonly productsCategoriesService: ProductsCategoriesService = new ProductsCategoriesService()
    ){}

    async getProductsByCategory(req: Request, res: Response){
        try{
            const { id } = req.params;
            const data = await this.productsCategoriesService.findAllProductsByCategory(Number(id));
            res.status(200).json(data);
        }catch(e){
           console.error(e); 
        }
    }

    async postCategoriesProducts(req: Request, res: Response){
        try {
            const data = await this.productsCategoriesService.createCategoriesProducts(req.body);
            res.status(201).json(data);
        }catch(e) {
            console.error(e);    
        }
    }
}