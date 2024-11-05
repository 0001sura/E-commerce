import { ProductEntity } from "src/entities/product.entity";
import { UserEntity } from "src/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CartEntity {
 @PrimaryGeneratedColumn()
 id:number;
 @ManyToOne(()=>UserEntity, (user)=>user.carts, {cascade:true})
 user:UserEntity
 @OneToMany(()=>CartItemEntity, cartItem=>cartItem.carts)
 cartitem:CartItemEntity[]
}

@Entity()
export class CartItemEntity{
 @PrimaryGeneratedColumn()
    id:number;
 @ManyToOne(()=>CartEntity, carts=>carts.cartitem, {cascade:true})
  carts:CartEntity;

 @ManyToOne(()=>ProductEntity, products=>products.cartitem,{cascade:true})
  products:ProductEntity;

 @Column('int')
  quantity:number
}
