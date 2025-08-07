import { IsNotEmpty, IsString, Length } from "class-validator";
import { BaseDTO } from "../../config/base.dto";

export class CategoryDTO extends BaseDTO{
    
    @IsNotEmpty()
    @IsString()
    @Length(1, 100)
    name: string;

}