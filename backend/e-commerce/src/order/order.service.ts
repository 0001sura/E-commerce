import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from '../entities/order.entity';
import { Repository } from 'typeorm';
import { orderProductEntity } from '../entities/order-product.entity';
import { UserService } from 'src/user/user.service';
import { orderShippEntity } from '../entities/ordershipping.entity';
import { ProductService } from 'src/product/product.service';
import { orderStatus } from './enums/order-status.enum';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';


@Injectable()
export class OrderService {
  constructor(@InjectRepository(OrderEntity) private orderRepository:Repository<OrderEntity>,
             @InjectRepository(orderProductEntity) private ordprodRepository:Repository<orderProductEntity>,
               private userService:UserService,
                private productService:ProductService){}
                
 async create(createOrderDto: CreateOrderDto){
  const ordership= new orderShippEntity()
  Object.assign(ordership,createOrderDto.orderShipping)
  const users= await this.userService.findOne(createOrderDto.userId)
    const orderEntity= new OrderEntity()
    orderEntity.addresShipping=ordership
    orderEntity.user=users

    const ordertbl=await this.orderRepository.save(orderEntity);
    
    for(let i=0; i< createOrderDto.orderProduct.length; i++)
    {
      const order=ordertbl;
      const products = await this.productService.findOne(createOrderDto.orderProduct[i].id);
      const product_quantity= createOrderDto.orderProduct[i].product_quantity
      const product_unit_price=createOrderDto.orderProduct[i].product_unit_price
  
      const opEntity= new orderProductEntity()

      opEntity.order=ordertbl,
      opEntity.products=products,
      opEntity.product_quantity=product_quantity,
      opEntity.product_unit_price=product_unit_price
      await this.ordprodRepository.save(opEntity);
   
    }
    return await this.findOne(ordertbl.id)
  }

 async findAll():Promise<OrderEntity[]> {
    return await this.orderRepository.find(
      {
        relations:{
          user:true,
          ordProd:{products:true},
          addresShipping:true
        }
      }
    );
  }

 async findOne(id: number):Promise<OrderEntity[]> {
    return await this.orderRepository.find(
      {where:{id:id},
        relations:{
          user:true,
          ordProd:{products:true},
          addresShipping:true
        }
      }
  )}

  async update(id: number, updateOrderStatusDto: UpdateOrderStatusDto) {
  const user= await this.userService.findOne(updateOrderStatusDto.userId)

    let order= await this.orderRepository.findOne({where:{id}})
    if(!order) throw new NotFoundException('the order is not found')

    if( (order.status===orderStatus.DELIVERED) || (order.status===orderStatus.CANCELED)){
      throw new BadRequestException (`order already ${order.status}`)}

    if( (order.status===orderStatus.PROCESSING) && (updateOrderStatusDto.status!==orderStatus.SHIPPED)){
      throw new BadRequestException (`delivery before shipped`)}

    if( (order.status===orderStatus.SHIPPED) && (updateOrderStatusDto.status===orderStatus.SHIPPED))
        { return order  }

    if(updateOrderStatusDto.status===orderStatus.SHIPPED){
          order.shippedAt=new Date()  }

    if(updateOrderStatusDto.status===orderStatus.DELIVERED){
          order.deliveredAt=new Date()
        }
        order.status=updateOrderStatusDto.status
        order.user=user
       order= await this.orderRepository.save(order)
       if(updateOrderStatusDto.status===orderStatus.DELIVERED){
        await this.stockUpdate(order,orderStatus.DELIVERED)
       }
    return order;

      }
  async cancel(id:number){
    const users= await this.userService.findOne(id)
    let order=await this.orderRepository.findOneBy({id})
    if(!order) throw new NotFoundException('the order is not found')
      if(order.status===orderStatus.CANCELED) return order
    order.status=orderStatus.CANCELED;
    order.user=users
    order=await this.orderRepository.save(order)
      await this.stockUpdate(order,orderStatus.CANCELED)
        return order
  }
  remove(id: number) {
    return `This action removes a #${id} order`;
  }
  async stockUpdate(order:OrderEntity,status:string){
    if (Array.isArray(order.ordProd)) {
    for(const op of order.ordProd){
      await this.productService.updateStock(op.product.id, op.product_quantity,status);}
    }
    else {
        console.error("ordProd is not an array:", order.ordProd);
    }
  }
}
