import { IsInt, IsNotEmpty, IsOptional, IsString, Length, Min } from "class-validator";
import { BaseDTO } from "../../config/base.dto";
import { ProductEntity } from "../../products/entities/products.entity";
import { UserEntity } from "../../user/entities/user.entity";

export class StockMovementDTO extends BaseDTO{
    
    @IsOptional()
    product?: ProductEntity;
    
    @IsOptional()
    user?: UserEntity;

    @IsNotEmpty()
    @IsString()
    @Length(1, 10)
    type: StockMovementType;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    quantity: number;
    
}

export enum StockMovementType {
    IN = "IN",
    OUT = "OUT",
}