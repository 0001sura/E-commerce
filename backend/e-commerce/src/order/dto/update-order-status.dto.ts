import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { orderStatus } from '../enums/order-status.enum';
export class UpdateOrderStatusDto{
   @IsNotEmpty()
    @IsString()
    @IsIn([orderStatus.SHIPPED,orderStatus.DELIVERED])
    status:orderStatus
   @IsNumber()
    userId:number
}