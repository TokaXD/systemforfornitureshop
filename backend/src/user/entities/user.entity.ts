import { randomUUID } from "crypto";
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";




@Entity('usersapp')
export class Users_entity{
    @PrimaryGeneratedColumn('uuid')
    id: string


    @Column()
    FullName: string


    @Column()
    email: string


    @Column()
    cellphone: string


    @Column()
    document: string


    @Column()
    sex: string

    @BeforeInsert()
    generateId(){
        if (this.id){
            return
        }
        this.id = randomUUID()
    }

    @Column()
    password: string
}