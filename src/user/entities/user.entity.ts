import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { StockMovementEntity } from "../../stock/entities/stockMovement.entity";
import { RoleType } from "../dto/user.dto";

@Entity({name: "users"})
export class UserEntity extends BaseEntity{
    
    @Column({
        unique: true,
        length: 100,
    })
    email: string;

    @Column({
        length: 100,
    })
    name: string;

    @Column({
        length: 100,
    })
    lastname: string;

    @Column({
        length: 255,
        select: false, // Prevents password from being selected by default
    })
    password: string;

    @Column({
        type: "enum",
        enum: RoleType,
        default: RoleType.EMPLOYED,
    })
    role: string;

    @OneToMany(()=> StockMovementEntity, (movement)=> movement.user)
    movements: StockMovementEntity[];
    
}