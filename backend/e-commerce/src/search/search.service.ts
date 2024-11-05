import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import dataSource from 'db/data-source';
import { ProductEntity } from 'src/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SearchService {
    constructor(@InjectRepository(ProductEntity) private productRepository:Repository<ProductEntity>){}
    async searchProducts(query:string):Promise<ProductEntity[]>{
      return this.productRepository.createQueryBuilder('product')
      .where('LOWER(product.title) LIKE  LOWER(:query)',{ query: `%${query}%`})
      .orWhere('LOWER(product.description) LIKE LOWER(:query)', {query: `%${query}%`})
      .getMany()
      
      }
      
    
      async filterProducts(categoryId?: number, minPrice?: number, maxPrice?: number, rating?: number) {
        let queryBuilder = dataSource.getRepository(ProductEntity).createQueryBuilder('product');
    
        if (categoryId) {
          queryBuilder = queryBuilder.andWhere('product.category.id = :categoryId', { categoryId });
        }
    
        if (minPrice) {
          queryBuilder = queryBuilder.andWhere('product.price >= :minPrice', { minPrice });
        }
    
        if (maxPrice) {
          queryBuilder = queryBuilder.andWhere('product.price <= :maxPrice', { maxPrice });
        }
    
        if (rating) {
          queryBuilder = queryBuilder.andWhere('product.rating >= :rating', { rating});
        }
    
        return queryBuilder.getMany();
      }
}
