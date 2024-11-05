import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '../entities/product.entity';
import { UserEntity } from 'src/entities/user.entity';
import { CategoryEntity } from 'src/entities/category.entity';
import { UserModule } from 'src/user/user.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { AuthGuard } from 'src/utitlity/auth-guard/auth-guard.guard';
import { JwtStrategy } from 'src/utitlity/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports:[TypeOrmModule.forFeature([ProductEntity,CategoryEntity]),CategoriesModule,UserModule,
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
  controllers: [ProductController],
  providers: [ProductService,JwtStrategy],
  exports:[ProductService,JwtStrategy, PassportModule]
})
export class ProductModule {}
