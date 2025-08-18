import { IsOptional } from "class-validator";
import { BaseDTO } from "../../config/base.dto";
import { ProductEntity } from "../entities/products.entity";
import { CategoryEntity } from "../../categories/entities/categories.entity";

export class ProductsCategoriesDTO extends BaseDTO{
    
    @IsOptional()
    product?: ProductEntity;


    @IsOptional()
    category?: CategoryEntity;

}