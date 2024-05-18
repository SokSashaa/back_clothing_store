import {Roles} from "../consts/enums";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    email: string;

    // @Column()
    // login: string;

    @Column()
    password: string;

    @Column()
    role: Roles;

    @Column()
    date_reg: Date;

    @Column()
    date_birthday: Date;
}
