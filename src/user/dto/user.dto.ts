import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
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
    role: RoleType;
}

export enum RoleType {
    EMPLOYED = "EMPLOYED",
    ADMIN = "ADMIN",
}