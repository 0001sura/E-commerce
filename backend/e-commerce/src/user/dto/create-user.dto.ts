import { IsEmail, IsString } from "class-validator";
import { CreateSignupDto } from "src/auth/dto/create-signup-dto";

export class CreateUserDto extends CreateSignupDto{
}
