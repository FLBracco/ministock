import { Check, Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { UserEntity } from "../../user/entities/user.entity";
import { ProductEntity } from "../../products/entities/products.entity";

@Check("CHK_TYPE_values", "type IN ('IN', 'OUT')") // Ensures type can only be 'IN' or 'OUT'
@Check("CHK_QUANTITY_NON_NEGATIVE", " quantity >= 0") // Ensures price cannot be negative
@Entity({name: "stock_movements"})
export class StockMovementEntity extends BaseEntity{
    
    @ManyToOne(()=> UserEntity, (user)=> user.movements)
    @JoinColumn({name: "user_id"})
    user: UserEntity;

    @ManyToOne(()=> ProductEntity, (product)=> product.movements)
    @JoinColumn({name: "product_id"})
    product: ProductEntity;

    @Column({
        length: 10
    })
    type: string;

    @Column({
        type: "int",
    })
    quantity: number;
}