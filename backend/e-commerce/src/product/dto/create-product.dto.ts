import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty,IsNumber, IsOptional, IsPositive, IsString, Min} from "class-validator";

export class CreateProductDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description:string

    @ApiProperty()
    @IsNumber({maxDecimalPlaces:2})
    @IsPositive()
    price:number

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    stock:number

    @ApiProperty()
    @IsNotEmpty()
    @IsArray()
    @IsOptional()
    images?:string[]


    @ApiProperty()
    @IsNumber()
    categoryId:number
}
