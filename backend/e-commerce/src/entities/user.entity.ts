import { CartEntity } from "src/entities/cart.entity";
import { CategoryEntity } from "src/entities/category.entity";
import { OrderEntity } from "src/entities/order.entity";
import { ProductEntity } from "src/entities/product.entity";
import { Review } from "src/entities/review.entity";
import { Roles } from "src/utitlity/roles/user-role.enum";
import { Column,
     CreateDateColumn, 
     Entity, 
     OneToMany,
      PrimaryGeneratedColumn,
       Timestamp, 
       UpdateDateColumn }
        from "typeorm";

@Entity("users")
export class UserEntity{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    name:string
    @Column({unique:true})
    email:string
    @Column({select:false})
    password:string
    @Column({type:'enum',enum:Roles,array:true,default:[Roles.USER]})
    roles:Roles
    @CreateDateColumn()
    createdAt:Timestamp
    @UpdateDateColumn()
    updatedAt:Timestamp

    @OneToMany(()=>CategoryEntity, (cat)=>cat.user)
   categories:CategoryEntity[]

   @OneToMany(()=>ProductEntity,(prod)=>prod.user)
   products:ProductEntity[]
   @OneToMany(()=>OrderEntity,(order)=>order.user)
   order:OrderEntity[]

   @OneToMany(()=>CartEntity,(carts)=>carts.user)
   carts:CartEntity[]

   @OneToMany(()=>Review, (reviews)=>reviews.user)
   reviews:Review[]
}
