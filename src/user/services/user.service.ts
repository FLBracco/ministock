import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { UserDTO } from "../dto/user.dto";
import { UserEntity } from "../entities/user.entity";
import * as bcrypt from "bcryptjs"

export class UserService extends BaseService<UserEntity> {
    constructor(){
        super(UserEntity);
    }

    async findAllUsers(): Promise<UserEntity[]> {
        return (await this.execRepository).find();
    }
    async findUserByID(id: number): Promise<UserEntity | null> {
        return (await this.execRepository).findOneBy({ id });
    }
    async findUserByEmail(email: string): Promise<UserEntity | null>{
        return (await this.execRepository)
            .createQueryBuilder("user")
            .addSelect("user.password")
            .where({email})
            .getOne();
    }
    async createUser(body: UserDTO): Promise<UserEntity> {
        const newUser = (await this.execRepository).create(body);
        const hash = await bcrypt.hash(newUser.password, 10);
        newUser.password = hash
        return (await this.execRepository).save(newUser);
    }
    async updateUser(id: number, infoUpdate: UserDTO): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate)
    }
    async deleteUser(id: number): Promise<DeleteResult> {
        return (await this.execRepository).delete(id);
    }
}