import { Column, Entity } from "typeorm";
import { BaseEntity } from "../config/base.entity";

@Entity({name: "users"})
export class UserEntity extends BaseEntity{
    
    @Column({unique: true})
    email: string;

    @Column()
    name: string;

    @Column()
    lastname: string;

    @Column()
    password: string;

    @Column({default: "empleado"})
    role: string;

}