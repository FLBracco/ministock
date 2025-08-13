import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { StockMovementDTO, StockMovementType } from "../dto/stock_movements.dto";
import { StockMovementEntity } from "../entities/stockMovement.entity";
import { ProductsService } from "../../products/services/products.service";
import { ProductsDTO } from "../../products/dto/products.dto";
import { ProductEntity } from "../../products/entities/products.entity";

export class StockMovementService extends BaseService<StockMovementEntity>{
    constructor(
        private readonly productService: ProductsService = new ProductsService,
    ){
        super(StockMovementEntity);
    }

    async findAllMovements(): Promise<StockMovementEntity[]> {
        return (await this.execRepository).find();
    }
    async createMovements(body: StockMovementDTO): Promise<StockMovementEntity> {
        
        const productID = body.product;

        const newSM = (await this.execRepository).create(body);
        console.log(newSM.product.id);
        const product = await this.productService.findProductByID(Number(productID));
        console.log(product);
        
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
    async updateMovement(id: number, infoUpdate: StockMovementDTO): Promise<UpdateResult>{
        return (await this.execRepository).update(id, infoUpdate)
    }
    async deleteMovement(id: number): Promise<DeleteResult> {
        return (await this.execRepository).delete(id);
    }

}