import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { orderStatus } from "../order/enums/order-status.enum";
import { UserEntity } from "src/entities/user.entity";
import { orderProductEntity } from "./order-product.entity";
import { orderShippEntity } from "./ordershipping.entity";

@Entity("order")
export class OrderEntity {
 @PrimaryGeneratedColumn()
 id:number

 @CreateDateColumn()
 orderAt:Timestamp

 @Column({type:"enum", enum:orderStatus,default:orderStatus.PROCESSING})
 status:string

 @Column({nullable:true})
 shippedAt:Date
 
 @Column({nullable:true})
 deliveredAt:Date

 @ManyToOne(()=>UserEntity,(user)=>user.order)
 user:UserEntity

 @OneToMany(()=>orderProductEntity,(op)=>op.order)
 ordProd:orderProductEntity

 @OneToOne(()=>orderShippEntity, (shipping)=>shipping.order,{cascade:true})
 @JoinColumn()
  addresShipping: orderShippEntity;
}

