import { BaseRouter } from "../shared/router/router";
import { ProductsController } from "./controllers/products.controller";
import { ProductsMiddleware } from "./middlewares/products.middleware";

export class ProductRouter extends BaseRouter<ProductsController, ProductsMiddleware> {
    constructor(){
        super(ProductsController, ProductsMiddleware);
    }

    routes(): void{
        this.router.get('/products', (req, res) => this.controller.getProducts(req, res));
        this.router.get('/product/:id', (req, res) => this.controller.getProductByID(req, res));
        this.router.post(
            '/products',
            (req, res, next) => [this.middleware.productValidator(req, res, next)],
            (req, res) => this.controller.createProduct(req, res)
        );
        this.router.put(
            '/product/:id',
            (req, res, next) => [this.middleware.productValidator(req, res, next)],
            (req, res) => this.controller.updateProduct(req, res)
        );
        this.router.delete(
            '/product/:id',
            this.middleware.passAuth("jwt"),
            (req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
            (req, res) => this.controller.deleteProduct(req, res)
        );
    }
}
