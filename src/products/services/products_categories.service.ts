import { In } from "typeorm";
import { CategoryService } from "../../categories/services/categories.service";
import { BaseService } from "../../config/base.service";
import { ProductCategoryEntity } from "../entities/products_categories.entity";
import { ProductsService } from "./products.service";

export class ProductsCategoriesService extends BaseService<ProductCategoryEntity>{
    constructor(
        private readonly productService: ProductsService = new ProductsService(),
        private readonly categoryService: CategoryService = new CategoryService(),
    ) {
        super(ProductCategoryEntity)
    }

    async findAllProductsByCategory(categoryID: number): Promise<ProductCategoryEntity[]>{
        return (await this.execRepository)
            .createQueryBuilder("category")
            .leftJoinAndSelect("category.product", "products")
            .where("category.id = :categoryID", {categoryID})
            .getMany()
    }

    async createCategoriesProducts(body: ProductCategoryEntity[]): Promise<ProductCategoryEntity[]> {
        const productsID = [... new Set(body.map(r => r.product))];
        const categoriesID = [... new Set(body.map(r => r.category))];

        const products = await (await this.productService.execRepository).find({where: {id: In(productsID)}});
        const categories = await (await this.categoryService.execRepository).find({where: {id: In(categoriesID)}});

        if(products.length !== productsID.length || categories.length !== categoriesID.length){
            throw new Error('Products or Categories Not Found');
        }
        return (await this.execRepository).save(body);
    }
}