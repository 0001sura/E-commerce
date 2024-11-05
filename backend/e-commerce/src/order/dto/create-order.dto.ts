import { Type } from "class-transformer";
import { CreateShippingDto } from "./create-shipping.dto";
import { IsNotEmpty, ValidateNested } from "class-validator";
import { OrderProductDto } from "./order-product.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDto {
    @ApiProperty()
    @IsNotEmpty()
    userId:number


    @ApiProperty()
    @Type(()=>CreateShippingDto)
    @ValidateNested()
    orderShipping:CreateShippingDto


    @ApiProperty()
    @Type(()=>OrderProductDto)
    @ValidateNested()
    orderProduct:OrderProductDto[]
}
