import { BaseRouter } from "../shared/router/router";
import { CategoryController } from "./controller/categories.controller";
import { CategoryMiddleware } from "./middlewares/categories.middleware";

export class CategoryRouter extends BaseRouter<CategoryController, CategoryMiddleware>{
    constructor(){
        super(CategoryController, CategoryMiddleware);
    }

    routes(): void{
        this.router.get(
            '/categories',
            this.middleware.passAuth("jwt"),
            (req, res) => this.controller.getCategories(req, res)
        );
        this.router.get(
            '/category/:id',
            this.middleware.passAuth("jwt"),
            (req, res) => this.controller.getCategoryByID(req, res)
        );
        this.router.post(
            '/categories',
            this.middleware.passAuth("jwt"),
            (req, res, next) => [this.middleware.checkAnyRole(req, res, next)],
            (req, res, next) => [this.middleware.categoryValidator(req, res, next)],
            (req, res) => this.controller.createCategory(req, res)
        );
        this.router.put(
            '/category/:id',
            this.middleware.passAuth("jwt"),
            (req, res, next) => [this.middleware.categoryValidator(req, res, next)],
            (req, res) => this.controller.updateCategory(req, res)
        );
        this.router.delete(
            '/category/:id',
            this.middleware.passAuth("jwt"),
            (req, res, next) => [this.middleware.checkAdminRole(req, res, next)], 
            (req, res) => this.controller.deleteCategory(req, res)
        );
    }
}