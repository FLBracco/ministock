import { BaseService } from "../../config/base.service";
import { ProductCategoryEntity } from "../entities/products_categories.entity";

export class ProductsCategoriesService extends BaseService<ProductCategoryEntity>{
    constructor() {
        super(ProductCategoryEntity)
    }

    async findAllProductsByCategory(categoryID: number): Promise<ProductCategoryEntity[]>{
        return (await this.execRepository)
            .createQueryBuilder("category")
            .leftJoinAndSelect("category.product", "products")
            .where("category.id = :categoryID", {categoryID})
            .getMany()
    }
}