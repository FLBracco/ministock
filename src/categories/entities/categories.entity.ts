import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { ProductCategoryEntity } from "../../custom/entities/products_categories.entity";

@Entity({name: "categories"})
export class CategoryEntity extends BaseEntity{
    
    @Column({
        length: 100,
        unique: true, // Ensures category names are unique
    })
    name:string;

    @OneToMany(()=> ProductCategoryEntity, (categoryProducts)=> categoryProducts.category)
    productCategories: ProductCategoryEntity[];
    
}