import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../entities/product.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { UserService } from 'src/user/user.service';
import { orderStatus } from 'src/order/enums/order-status.enum';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity) 
    private productRepository: Repository<ProductEntity>,
    private userService: UserService,
    private categoriesService: CategoriesService) {}

  async create(createProductDto: CreateProductDto, user:UserEntity): Promise<ProductEntity> {
    // const { categoryId, ...rest} = createProductDto;
    // const user = await this.userService.findOne(userId);
    // const category = await this.categoriesService.findOne(categoryId);
    if (!user) throw new NotFoundException('User not found');
    // if (!category) throw new NotFoundException('Category not found');
    const products = this.productRepository.create(createProductDto);
  products.user=user
    const getProduct= await this.productRepository.save(products);
  // delete getProduct.category
    return getProduct
  }

async findAll():Promise<ProductEntity[]> {
    return await this.productRepository.find({relations:{category:true},
    select:{category:{
      id:true,
      title:true,
      description:true
    }}})
  }

  async findOne(id: number):Promise<ProductEntity> {
    const getProduct= await this.productRepository.findOne(
      {where:{id},
      relations:{user:true,category:true},
    select:{category:{
      id:true,
      title:true,
      description:true
    }}})
    if(!getProduct) throw new NotFoundException("product not found")
    return getProduct;
  }

 async update(id: number, updateProductDto: UpdateProductDto):Promise<UpdateResult> {
    return await this.productRepository.update(id,updateProductDto)
  }

async remove(id: number):Promise<DeleteResult> {
    return await this.productRepository.delete(id);
  }
  async updateStock(id:number,stock:number, status:string){
    let product=await this.findOne(id)
    if(status===orderStatus.DELIVERED){
      product.stock-=stock
    }
    else{
      product.stock+=stock
    }
    product=await this.productRepository.save(product)
    return product;
  }
}
