import { IsOptional } from "class-validator";
import { BaseDTO } from "../../config/base.dto";
import { ProductsDTO } from "./products.dto";
import { CategoryDTO } from "../../categories/dto/categories.dto";

export class ProductsCategoriesDTO extends BaseDTO{
    
    @IsOptional()
    product?: ProductsDTO;


    @IsOptional()
    category?: CategoryDTO;

}