import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { StockMovementDTO } from "../dto/stock_movements.dto";
import { StockMovementEntity } from "../entities/stockMovement.entity";

export class StockMovementService extends BaseService<StockMovementEntity>{
    constructor(){
        super(StockMovementEntity);
    }

    async findAllMovements(): Promise<StockMovementEntity[]> {
        return (await this.execRepository).find();
    }
    async createMovements(body: StockMovementDTO): Promise<StockMovementEntity> {
        return (await this.execRepository).save(body);
    }
    async updateMovement(id: number, infoUpdate: StockMovementDTO): Promise<UpdateResult>{
        return (await this.execRepository).update(id, infoUpdate)
    }
    async deleteMovement(id: number): Promise<DeleteResult> {
        return (await this.execRepository).delete(id);
    }

}