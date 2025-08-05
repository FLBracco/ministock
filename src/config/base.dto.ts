import { IsInt, IsOptional, Min } from 'class-validator';

export class BaseDTO {
    
    @IsOptional()
    @IsInt()
    @Min(1)
    id: number;
    
    @IsOptional()
    createdAt: Date;
    
    @IsOptional()
    updatedAt: Date;
}