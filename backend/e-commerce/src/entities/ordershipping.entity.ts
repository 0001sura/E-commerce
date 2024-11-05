import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderEntity } from "./order.entity";

@Entity("orderShipping")
export class orderShippEntity{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    phone:string
    @Column({default:' '})
    name:string
    @Column()
    address:string
    @Column()
    City:string
    @Column()
    state:string
    @Column()
    postalCode:string
    @Column()
    country:string

  @OneToOne(()=>OrderEntity,(order)=>order.addresShipping)
  order:OrderEntity  
}