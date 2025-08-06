import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { ProductsDTO } from "../dto/products.dto";
import { ProductEntity } from "../entities/products.entity";

export class ProductsService extends BaseService<ProductEntity>{
    constructor(){
        super(ProductEntity);
    }

    async findAllProducts(): Promise<ProductEntity[]>{
        return (await this.execRepository).find();
    }
    async findProductByID(id: number): Promise<ProductEntity | null>{
        return (await this.execRepository).findOneBy({id});
    }
    async createProduct(body: ProductsDTO): Promise<ProductEntity>{
        return (await this.execRepository).save(body);
    }
    async updateProduct(id: number, infoUpdate: ProductsDTO): Promise<UpdateResult>{
        return (await this.execRepository).update(id, infoUpdate);
    }
    async deleteProduct(id: number): Promise<DeleteResult>{
        return (await this.execRepository).delete(id);
    }
}