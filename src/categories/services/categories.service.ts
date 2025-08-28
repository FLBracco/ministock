import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { CategoryDTO } from "../dto/categories.dto";
import { CategoryEntity } from "../entities/categories.entity";
import { HttpResponse } from "../../shared/response/http.response";

export class CategoryService extends BaseService<CategoryEntity>{
    constructor(
        private readonly httpResponse: HttpResponse = new HttpResponse(),
    ){
        super(CategoryEntity)
    }
    
    async findAllCategories(): Promise<CategoryEntity[]> {
        return (await this.execRepository).find();
    }
    async findCategoryByID(id: number): Promise<CategoryEntity | null> {
        return (await this.execRepository).findOneBy({id});
    }
    async createCategory(body: CategoryDTO): Promise<CategoryEntity> {
        return (await this.execRepository).save(body);
    }
    async updateCategory(id: number, infoUpdate: CategoryDTO): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate);
    }
    async deleteCategory(id: number): Promise<DeleteResult> {
        return (await this.execRepository).delete(id);
    }
}