import { IsInt, IsNotEmpty, IsString, Length, Min } from "class-validator";
import { BaseDTO } from "../../config/base.dto";

export class StockMovementDTO extends BaseDTO{
    
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