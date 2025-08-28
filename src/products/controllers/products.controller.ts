import { Request, Response } from "express";
import { ProductsService } from "../services/products.service";
import { HttpResponse } from "../../shared/response/http.response";

export class ProductsController {
    constructor(
        private readonly productService: ProductsService = new ProductsService(),
        private readonly httpResponse: HttpResponse = new HttpResponse(),        
    ){}
    
    async getProducts(_req: Request, res: Response){
        try {
            const data = await this.productService.findAllProducts();
            return this.httpResponse.Ok(res, data);
        }catch(e) {
            console.error(e);
            return this.httpResponse.Error(res, e);
        }
    }
    
    async getProductByID(req: Request, res: Response){
        try {
            const { id } = req.params
            const data = await this.productService.findProductByID(Number(id));
            if(!data){
                return this.httpResponse.NotFound(res, 'Product not found!');
            }
            return this.httpResponse.Ok(res, data);
        } catch (e) {
            console.error(e)
            return this.httpResponse.Error(res, e);
        }
    }
    
    async createProduct(req: Request, res: Response){
        try {
            const data = await this.productService.createProduct(req.body);
            return this.httpResponse.Created(res, data);
        } catch (e) {
            console.error(e)
            return this.httpResponse.Error(res, e);
        }
    }
    
    async updateProduct(req: Request, res: Response){
        try {
            const { id } = req.params
            const data = await this.productService.updateProduct(Number(id), req.body);
            if(data.affected === 0){
                return this.httpResponse.NotFound(res, 'Product not found!');
            }
            return this.httpResponse.Ok(res, data);
        } catch (e) {
            console.error(e)
            return this.httpResponse.Error(res, e);
        }
    }
    
    async deleteProduct(req: Request, res: Response){
        try {
            const { id } = req.params
            const data = await this.productService.deleteProduct(Number(id));
            if(data.affected === 0){
                return this.httpResponse.NotFound(res, 'Product not found!');
            }
            return this.httpResponse.Ok(res, data);
        } catch (e) {
            console.error(e);
            return this.httpResponse.Error(res, e);
        }
    }

}