import { Request, Response } from "express";
import { CategoryService } from "../services/categories.service";

export class CategoryController {
    constructor(private readonly categoryService: CategoryService = new CategoryService()){}

    async getCategories(_req: Request, res: Response){
        try {
            const data = await this.categoryService.findAllCategories();
            res.status(200).json(data);
        }catch(e) {
            console.error(e);
        }
    }
    async getCategoryByID(req: Request, res: Response){
        try {
            const { id } = req.params;
            const data = await this.categoryService.findCategoryByID(Number(id));
            res.status(200).json(data);    
        }catch(e) {
            console.error(e);
        }
    }
    async createCategory(req: Request, res: Response){
        try {
            const data = await this.categoryService.createCategory(req.body);
            res.status(201).json(data);
        }catch(e) {
            console.error(e);   
        }
    }
    async updateCategory(req: Request, res: Response){
        try {
            const { id } = req.params
            const data = await this.categoryService.updateCategory(Number(id), req.body);
            res.status(200).json(data);
        }catch(e) {
            console.error(e);   
        }
    }
    async deleteCategory(req: Request, res: Response){
        try {
            const { id } = req.params;
            const data = await this.categoryService.deleteCategory(Number(id));
            res.status(200).json(data);
        }catch(e) {
            console.error(e);   
        }
    }
}