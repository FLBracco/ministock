import { BaseRouter } from "../shared/router/router";
import { ProductsCategoriesController } from "./controllers/products_categories.controller";
import { ProductsCategoriesMiddleware } from "./middlewares/products_categories.middleware";

export class ProductsCategoriesRouter extends BaseRouter<ProductsCategoriesController, ProductsCategoriesMiddleware> {
    constructor(){
        super(ProductsCategoriesController, ProductsCategoriesMiddleware)
    }

    routes(): void {
        this.router.get(
            "/categories-products",
            this.middleware.passAuth("jwt"),
            (req, res) => this.controller.getProductsCategories(req, res)
        );
        this.router.get(
            "/categories/:id/products",
            this.middleware.passAuth("jwt"),
            (req, res) => this.controller.getProductsByCategory(req, res)
        );
        this.router.post(
            "/categories-products",
            this.middleware.passAuth("jwt"),
            (req, res, next) => [this.middleware.prodCategoriesValidator(req, res, next)],
            (req, res) => this.controller.postCategoriesProducts(req, res)
        );
        this.router.put(
            "/product-category/:id",
            this.middleware.passAuth("jwt"),
            (req, res, next) => [this.middleware.prodCategoriesValidator(req, res, next)],
            (req, res) => this.controller.putProductCategory(req, res)
        );
        this.router.delete(
            "/categories-products/:id",
            this.middleware.passAuth("jwt"),
            (req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
            (req, res) => this.controller.deleteCategoriesProducts(req, res));
    }
}