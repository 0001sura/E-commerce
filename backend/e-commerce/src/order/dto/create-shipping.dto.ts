import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateShippingDto{
    @IsString()
    @IsNotEmpty()
    phone:string
    @IsOptional()
    @IsString()
    name:string
    @IsString()
    @IsNotEmpty()
    postalCode:string
    @IsString()
    @IsNotEmpty()
    City:string
    @IsString()
    @IsNotEmpty()
    address:string
    @IsString()
    @IsNotEmpty()
    country:string
    @IsString()
    @IsNotEmpty()
    state:string

}