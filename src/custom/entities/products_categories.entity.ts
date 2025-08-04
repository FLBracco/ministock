import { Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { ProductEntity } from "../../products/entities/products.entity";
import { CategoryEntity } from "../../categories/entities/categories.entity";

@Entity({name: "products_categories"})
export class ProductCategoryEntity extends BaseEntity{
    
    @ManyToOne(()=> ProductEntity, (products)=> products.productCategories)
    @JoinColumn({name: "product_id"})
    product: ProductEntity;

    @ManyToOne(()=> CategoryEntity, (category)=> category.productCategories)
    @JoinColumn({name: "category_id"})
    category: CategoryEntity;

}