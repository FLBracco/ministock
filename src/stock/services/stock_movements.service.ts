import { DeleteResult, UpdateResult } from "typeorm";
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
        return (await this.execRepository).find();
    }
    async createMovements(body: StockMovementDTO): Promise<StockMovementEntity> {
        const newSM = (await this.execRepository).create(body);
        const product = await this.productService.findProductByID(newSM.product.id);
        if(!product) throw new Error('Product not found');
        if(newSM.type === StockMovementType.IN){
            product.stockQuantity += newSM.quantity;
        } else if (newSM.type === StockMovementType.OUT){
            if(product.stockQuantity < newSM.quantity){
                throw new Error('Insufficient stock for this operation');
            }
            product.stockQuantity -= newSM.quantity;
        }
        return (await this.execRepository).save(newSM);
    }
    async updateMovement(id: number, infoUpdate: StockMovementDTO): Promise<UpdateResult>{
        return (await this.execRepository).update(id, infoUpdate)
    }
    async deleteMovement(id: number): Promise<DeleteResult> {
        return (await this.execRepository).delete(id);
    }

}