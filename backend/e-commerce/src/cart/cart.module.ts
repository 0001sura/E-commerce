import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity, CartItemEntity } from '../entities/cart.entity';
import { UserModule } from 'src/user/user.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports:[TypeOrmModule.forFeature([CartEntity,CartItemEntity]),
  UserModule,
  ProductModule],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
