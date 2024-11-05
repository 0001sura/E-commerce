import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description:string
    
    // @ApiProperty()
    // @IsNumber()
    // userId:number
}
