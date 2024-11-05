import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { AuthGuard } from 'src/utitlity/auth-guard/auth-guard.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/utitlity/jwt.strategy';
import { PassportModule } from '@nestjs/passport';



@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]),
ConfigModule.forRoot({
  isGlobal:true
}),
PassportModule.register({defaultStrategy:'jwt'}),
JwtModule.registerAsync({
  imports:[ConfigModule],
  inject:[ConfigService],
  useFactory:(configService:ConfigService)=>({
  secret:configService.get<string>('JWT_SECRET'),
  signOptions:{
    expiresIn:'1hr'
  }
  })
})
],
  controllers: [UserController],
  providers: [UserService,JwtStrategy],
  exports:[UserService,JwtStrategy, PassportModule]
})
export class UserModule {}
