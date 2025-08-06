import { BaseRouter } from "../shared/router/router";
import { ProductsController } from "./controllers/products.controller";

export class ProductRouter extends BaseRouter<ProductsController> {
    constructor(){
        super(ProductsController);
    }

    routes(): void{
        this.router.get('/products', (req, res) => this.controller.getProducts(req, res));
        this.router.get('/product/:id', (req, res) => this.controller.getProductByID(req, res));
        this.router.post('/products', (req, res) => this.controller.createProduct(req, res));
        this.router.put('/product/:id', (req, res) => this.controller.updateProduct(req, res));
        this.router.delete('/product/:id', (req, res) => this.controller.deleteProduct(req, res));
    }
}
