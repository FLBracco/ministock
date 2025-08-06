import { Request, Response } from "express";
import { ProductsService } from "../services/products.service";

export class ProductsController {
    constructor(private readonly productService: ProductsService = new ProductsService()){}
    
    async getProducts(_req: Request, res: Response){
        try {
            const data = await this.productService.findAllProducts();
            res.status(200).json(data);
        }catch(e) {
            console.error(e);
        }
    }

    async getProductByID(req: Request, res: Response){
        try {
            const { id } = req.params
            const data = await this.productService.findProductByID(Number(id));
            res.status(200).json(data);
        } catch (e) {
            console.error(e)
        }
    }

    async createProduct(req: Request, res: Response){
        try {
            const data = await this.productService.createProduct(req.body);
            res.status(201).json(data);
        } catch (e) {
            console.error(e)
        }
    }

    async updateProduct(req: Request, res: Response){
        try {
            const { id } = req.params
            const data = await this.productService.updateProduct(Number(id), req.body);
            res.status(200).json(data);
        } catch (e) {
            console.error(e)
        }
    }

    async deleteProduct(req: Request, res: Response){
        try {
            const { id } = req.params
            const data = await this.productService.deleteProduct(Number(id));
            res.status(200).json(data);
        } catch (e) {
            console.error(e)
        }
    }

}