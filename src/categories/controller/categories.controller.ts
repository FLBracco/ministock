import { Request, Response } from "express";
import { CategoryService } from "../services/categories.service";
import { HttpResponse } from "../../shared/response/http.response";

export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService = new CategoryService(),
        private readonly httpResponse: HttpResponse = new HttpResponse(),
    ){}

    async getCategories(_req: Request, res: Response){
        try {
            const data = await this.categoryService.findAllCategories();
            return this.httpResponse.Ok(res, data);
        }catch(e) {
            console.error(e);
            return this.httpResponse.Error(res, e);
        }
    }
    async getCategoryByID(req: Request, res: Response){
        try {
            const { id } = req.params;
            const data = await this.categoryService.findCategoryByID(Number(id));
            return this.httpResponse.Ok(res, data);
        }catch(e) {
            console.error(e);
            return this.httpResponse.Error(res, e);
        }
    }
    async createCategory(req: Request, res: Response){
        try {
            const data = await this.categoryService.createCategory(req.body);
            return this.httpResponse.Created(res, data);
        }catch(e) {
            console.error(e);   
            return this.httpResponse.Error(res, e);
        }
    }
    async updateCategory(req: Request, res: Response){
        try {
            const { id } = req.params
            const data = await this.categoryService.updateCategory(Number(id), req.body);
            return this.httpResponse.Ok(res, data);
        }catch(e) {
            console.error(e);   
            return this.httpResponse.Error(res, e);
        }
    }
    async deleteCategory(req: Request, res: Response){
        try {
            const { id } = req.params;
            const data = await this.categoryService.deleteCategory(Number(id));
            return this.httpResponse.Ok(res, data);
        }catch(e) {
            console.error(e);   
            return this.httpResponse.Error(res, e);
        }
    }
}