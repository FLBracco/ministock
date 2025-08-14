import { BaseRouter } from "../shared/router/router";
import { ProductsCategoriesController } from "./controllers/products_categories.controller";

export class ProductsCategoriesRouter extends BaseRouter<ProductsCategoriesController> {
    constructor(){
        super(ProductsCategoriesController)
    }

    routes(): void {
        this.router.get("/categories/:id/products", (req, res) => this.controller.getProductsByCategory(req, res));
        this.router.post("/categories-products", (req, res) => this.controller.postCategoriesProducts(req, res));
    }
}