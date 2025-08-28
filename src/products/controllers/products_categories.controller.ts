import { Request, Response } from "express";
import { ProductsCategoriesService } from "../services/products_categories.service";
import { HttpResponse } from "../../shared/response/http.response";

export class ProductsCategoriesController {
    constructor(
        private readonly productsCategoriesService: ProductsCategoriesService = new ProductsCategoriesService(),
        private readonly httpResponse: HttpResponse = new HttpResponse(),
    ){}

    async getProductsCategories(req: Request, res:Response){
        try {
            const data = await this.productsCategoriesService.findAllProductsCategories();
            return this.httpResponse.Ok(res, data);
        }catch(e){
            console.error(e);
            return this.httpResponse.Error(res, e);
        }
    }
    
    async getProductsByCategory(req: Request, res: Response){
        try{
            const { id } = req.params;
            const data = await this.productsCategoriesService.findAllProductsByCategory(Number(id));
            if(!data){
                return this.httpResponse.NotFound(res, 'Category not found!');
            }
            return this.httpResponse.Ok(res, data);
        }catch(e){
            console.error(e); 
            return this.httpResponse.Error(res, e);
        }
    }
    
    async postCategoriesProducts(req: Request, res: Response){
        try {
            const data = await this.productsCategoriesService.createCategoriesProducts(req.body);
            return this.httpResponse.Created(res, data);
        }catch(e) {
            console.error(e);    
            return this.httpResponse.Error(res, e);
        }
    }
    
    async putProductCategory(req: Request, res: Response){
        try {
            const { id } = req.params
            const data = await this.productsCategoriesService.updateProductCategory(Number(id), req.body);
            if(data.affected === 0){
                return this.httpResponse.NotFound(res, 'Product-Category relation not found!');
            }
            return this.httpResponse.Ok(res, data);
        }catch(e){
            console.error(e);
            return this.httpResponse.Error(res, e);
        }
    }
    
    async deleteCategoriesProducts(req: Request, res: Response){
        try {
            const { id } = req.params
            const data = await this.productsCategoriesService.deleteCategoriesProducts(Number(id));
            if(data.affected === 0){
                return this.httpResponse.NotFound(res, 'Product-Category relation not found!');
            }
            return this.httpResponse.Ok(res, data);
        }catch(e) {
            console.error(e);    
            return this.httpResponse.Error(res, e);
        }
    }
}