import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Max, Min } from "class-validator";
import { BaseDTO } from "../../config/base.dto";

export class ProductsDTO extends BaseDTO{

    @IsNotEmpty()
    @IsString()
    @Length(1, 150)
    productName: string;
    
    @IsOptional()
    @IsString()    
    description: string;
    
    @IsNumber({maxDecimalPlaces: 2}, {message: "Price must have at most 2 decimal places"})
    @Min(0, {message: "Price must be at least 0"})
    @Max(99999999.99, {message: "Price must not exceed 99999999.99"}) 
    price: number;
    
    @IsOptional()
    @IsInt()
    @Min(1)
    stockQuantity: number;
        
}