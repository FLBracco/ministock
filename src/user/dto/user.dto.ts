import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { BaseDTO } from "../../config/base.dto";

export class UserDTO extends BaseDTO{

    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    
    @IsNotEmpty()
    @IsString()
    name: string;
    
    
    @IsNotEmpty()
    @IsString()
    lastname: string;
    
    
    @IsNotEmpty()
    @IsString()
    password: string;
    
    
    @IsNotEmpty()
    @IsString()
    role: string;
}