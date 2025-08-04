import { Check, Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { StockMovementEntity } from "../../stock/entities/stockMovement.entity";
import { ProductCategoryEntity } from "../../custom/entities/products_categories.entity";

@Check("CHK_STOCK_NON_NEGATIVE", "stock_quantity >= 0") // Ensures stock quantity cannot be negative
@Check("CHK_PRICE_NON_NEGATIVE", " price >= 0") // Ensures price cannot be negative
@Entity({name: "products"})
export class ProductEntity extends BaseEntity{
    
    @Column({
        name: "name",
        length: 150,
    })
    productName: string;

    @Column({
        type: "text",
        nullable: true, // Allows description to be optional
    })
    description: string;

    @Column({
        type: "numeric",
        precision: 10,
        scale: 2,
    })
    price: number;

    @Column({
        name: "stock_quantity",
        type: "int",
        default: 0, // Default stock quantity is 0
    })
    stockQuantity: number;

    @OneToMany(()=> StockMovementEntity, (movement)=> movement.product)
    movements: StockMovementEntity[];

    @OneToMany(()=> ProductCategoryEntity, (productCategories)=> productCategories.product)
    productCategories: ProductCategoryEntity[];
    
}