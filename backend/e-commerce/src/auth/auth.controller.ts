import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateSignupDto } from 'src/auth/dto/create-signup-dto';
import { CreateSigninDto } from './dto/create-signin-dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'src/entities/user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('register')
    signup(@Body() createSignupDto:CreateSignupDto){
      return this.authService.signup(createSignupDto)
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
   async LogIn(@Body() createSigninDto:CreateSigninDto):Promise<{
      token: string;
      user: UserEntity;
    }> {{
      const user = await this.authService.signin(createSigninDto);
    const token = await this.authService.token(user);

    return { token, user };
  }
    }
 }
