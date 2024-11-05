import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateCartDto {
    @IsNotEmpty()
    @IsNumber()
    productId:number
    @IsNumber()
    @IsNotEmpty()
    quantity:number
}
