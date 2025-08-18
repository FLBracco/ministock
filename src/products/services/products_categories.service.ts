import { DeleteResult, In, UpdateResult } from "typeorm";
import { CategoryService } from "../../categories/services/categories.service";
import { BaseService } from "../../config/base.service";
import { ProductCategoryEntity } from "../entities/products_categories.entity";
import { ProductsService } from "./products.service";
import { ProductsCategoriesDTO } from "../dto/products_categories.dto";

export class ProductsCategoriesService extends BaseService<ProductCategoryEntity>{
    constructor(
        private readonly productService: ProductsService = new ProductsService(),
        private readonly categoryService: CategoryService = new CategoryService(),
    ) {
        super(ProductCategoryEntity)
    }

    async findAllProductsCategories(): Promise<ProductCategoryEntity[]>{
        return (await this.execRepository).find({
            relations: ["product", "category"],
        });
    }

    async findAllProductsByCategory(categoryID: number): Promise<ProductCategoryEntity[]>{
        
        const productsByCategory = (await this.execRepository)
            .createQueryBuilder("pc")
            .leftJoinAndSelect("pc.product", "pcProducts")
            .where("pc.category = :categoryID", {categoryID})
            .getMany()
        return productsByCategory
    }
    
    async createCategoriesProducts(body: ProductsCategoriesDTO[]): Promise<ProductCategoryEntity[] | null> {
        const productsID = [... new Set(body.map(r => r.product))];
        const categoriesID = [... new Set(body.map(r => r.category))];

        const products = await (await this.productService.execRepository).find({where: {id: In(productsID)}});
        const categories = await (await this.categoryService.execRepository).find({where: {id: In(categoriesID)}});

        if(products.length !== productsID.length || categories.length !== categoriesID.length){
            throw new Error('Products or Categories Not Found');
        }
        return (await this.execRepository).save(body);
    }

    async updateProductCategory(relationID: number, infoUpdate: ProductsCategoriesDTO): Promise<UpdateResult>{
        const {product, category} = infoUpdate;
        const cat = await this.categoryService.findCategoryByID(Number(category));
        const prod = await this.categoryService.findCategoryByID(Number(product));
        if(!prod || !cat){
            throw new Error("Product or Category not found");
        }
        return (await this.execRepository).update(relationID, infoUpdate);
    }

    async deleteCategoriesProducts(id: number): Promise<DeleteResult>{
        return (await this.execRepository).delete({id});
    }
}