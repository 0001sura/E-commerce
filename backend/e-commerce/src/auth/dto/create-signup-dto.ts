import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { CreateSigninDto } from "./create-signin-dto";
import { ApiProperty } from "@nestjs/swagger";

export class CreateSignupDto extends CreateSigninDto{
@IsString()
@ApiProperty()
@IsNotEmpty()
name:string
}