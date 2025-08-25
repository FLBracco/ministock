import { BaseService } from "../../config/base.service";
import { StockMovementDTO, StockMovementType } from "../dto/stock_movements.dto";
import { StockMovementEntity } from "../entities/stockMovement.entity";
import { ProductsService } from "../../products/services/products.service";
import { ProductsDTO } from "../../products/dto/products.dto";

export class StockMovementService extends BaseService<StockMovementEntity>{
    
    constructor(
        private readonly productService: ProductsService = new ProductsService,
    ){
        super(StockMovementEntity);
    }

    async findAllMovements(): Promise<StockMovementEntity[]> {
        return (await this.execRepository).find({
            relations: ["user", "product"],
        });
    }

    async findSMByID(stockID: number): Promise<StockMovementEntity | null>{
        return (await this.execRepository).findOne({
            where: {id: stockID}, 
            relations: ["user", "product"]
        });
    }

    async createMovements(body: StockMovementDTO): Promise<StockMovementEntity> {
        const productID = body.product;
        const newSM = (await this.execRepository).create(body);
        const product = await this.productService.findProductByID(Number(productID));
        
        if(!product) throw new Error('Product not found');
        
        if(newSM.type === StockMovementType.IN) {
            product.stockQuantity += newSM.quantity;
        }else if(newSM.type === StockMovementType.OUT) {
            if(newSM.quantity > product.stockQuantity) {
                throw new Error('Insufficient stock for this operation');
            }
            product.stockQuantity -= newSM.quantity;
        }
        const productUpdate: ProductsDTO = {
            productName: product.productName,
            price: product.price,
            stockQuantity: product.stockQuantity
        }
        await this.productService.updateProduct(product.id, productUpdate);
        return (await this.execRepository).save(newSM);
    }

}